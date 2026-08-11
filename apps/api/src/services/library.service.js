const LibraryRecommendation = require("../models/LibraryRecommendation");
const { createBookSchema } = require("../validations/library.validation");

const normalizeBookField = (value) => {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const createBook = async (data) => {
  const normalizedTitle = normalizeBookField(data.title);
  const normalizedAuthor = normalizeBookField(data.author);

  const existingBook = await LibraryRecommendation.findOne({
    normalizedTitle,
    normalizedAuthor,
    recommendedBy: data.recommendedBy,
    isDeleted: false,
  });

  if (existingBook) {
    throw new Error("BOOK_ALREADY_EXISTS");
  }

  const now = new Date();

  const book = await LibraryRecommendation.create({
    ...data,
    normalizedTitle,
    normalizedAuthor,
    hasBeenPublished: data.status === "published",
    firstPublishedAt: data.status === "published" ? now : null,
    lastPublishedAt: data.status === "published" ? now : null,
  });

  return book.populate("recommendedBy", "pseudo role");
};

const getLibrary = async () => {
  const books = await LibraryRecommendation.find({
    isDeleted: false,
    status: "published",
  })
    .populate("recommendedBy", "pseudo role")
    .sort({ createdAt: -1 });

  return books;
};

const getLibraryById = async (bookId) => {
  const book = await LibraryRecommendation.findOne({
    _id: bookId,
    isDeleted: false,
    status: "published",
  }).populate("recommendedBy", "pseudo role");

  return book;
};

const assertCanManageBook = (book, currentUser) => {
  const isAdmin = currentUser.role === "admin";
  const isOwner = book.recommendedBy.toString() === currentUser._id.toString();

  if (!isAdmin && !isOwner) {
    throw new Error("FORBIDDEN");
  }
};

const updateBook = async (bookId, updates, currentUser) => {
  const book = await LibraryRecommendation.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("BOOK_NOT_FOUND");
  }

  assertCanManageBook(book, currentUser);

  const wasPublished = book.status === "published";
  const willBePublished = updates.status === "published";
  const wasDraft = book.status === "draft";

  if (willBePublished) {
    const currentBook =
      typeof book.toObject === "function" ? book.toObject() : book;
    const publicationValidation = createBookSchema.safeParse({
      ...currentBook,
      ...updates,
      status: "published",
    });

    if (!publicationValidation.success) {
      const validationError = new Error("INVALID_PUBLICATION");
      validationError.validationMessage =
        publicationValidation.error.issues[0].message;
      throw validationError;
    }
  }

  if (book.hasBeenPublished) {
    if (updates.title && updates.title !== book.title) {
      throw new Error("BOOK_TITLE_LOCKED_AFTER_PUBLICATION");
    }

    if (updates.author && updates.author !== book.author) {
      throw new Error("BOOK_AUTHOR_LOCKED_AFTER_PUBLICATION");
    }
  }

  if (!book.hasBeenPublished && (updates.title || updates.author)) {
    const nextTitle = updates.title || book.title;
    const nextAuthor = updates.author || book.author;

    const normalizedTitle = normalizeBookField(nextTitle);
    const normalizedAuthor = normalizeBookField(nextAuthor);

    const existingBook = await LibraryRecommendation.findOne({
      normalizedTitle,
      normalizedAuthor,
      recommendedBy: book.recommendedBy,
      isDeleted: false,
      _id: { $ne: bookId },
    });

    if (existingBook) {
      throw new Error("BOOK_ALREADY_EXISTS");
    }

    updates.normalizedTitle = normalizedTitle;
    updates.normalizedAuthor = normalizedAuthor;
  }

  const contentFields = [
    "coverImageUrl",
    "subject",
    "universe",
    "opinion",
    "whyRecommend",
    "startedBecause",
    "readingExpectation",
    "abandonedReason",
    "disappointment",
    "readingStatus",
  ];

  const hasContentChanges = contentFields.some(
    (field) => updates[field] !== undefined && updates[field] !== book[field],
  );

  if (book.hasBeenPublished && hasContentChanges) {
    book.hasBeenModifiedAfterPublication = true;
  }

  if (!book.hasBeenPublished && wasDraft && willBePublished) {
    book.hasBeenPublished = true;
    book.firstPublishedAt = new Date();
    book.lastPublishedAt = new Date();
  }

  if (book.hasBeenPublished && !wasPublished && willBePublished) {
    book.lastPublishedAt = new Date();
  }

  Object.assign(book, updates);

  await book.save();

  return book;
};

const deleteLibrary = async (bookId, currentUser) => {
  const book = await LibraryRecommendation.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("BOOK_NOT_FOUND");
  }

  assertCanManageBook(book, currentUser);

  book.isDeleted = true;

  await book.save();

  return book;
};

const likeBook = async (bookId, userId) => {
  const existingBook = await LibraryRecommendation.findOne({
    _id: bookId,
    isDeleted: false,
    status: "published",
  });

  if (!existingBook) {
    throw new Error("BOOK_NOT_FOUND");
  }

  if (existingBook.recommendedBy.toString() === userId.toString()) {
    throw new Error("SELF_REACTION_NOT_ALLOWED");
  }

  const book = await LibraryRecommendation.findOneAndUpdate(
    {
      _id: bookId,
      isDeleted: false,
      status: "published",
    },
    {
      $addToSet: { likedBy: userId },
    },
    {
      new: true,
    },
  );

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return book;
};

const unlikeBook = async (bookId, userId) => {
  const book = await LibraryRecommendation.findOneAndUpdate(
    {
      _id: bookId,
      isDeleted: false,
      status: "published",
    },
    {
      $pull: { likedBy: userId },
    },
    {
      new: true,
    },
  );

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return book;
};

const getMyBooks = async (userId) => {
  const books = await LibraryRecommendation.find({
    recommendedBy: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  return books;
};

const getLibraryByIdPrivate = async (bookId, currentUser) => {
  const book = await LibraryRecommendation.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("BOOK_NOT_FOUND");
  }

  const isAdmin = currentUser.role === "admin";

  const isOwner = book.recommendedBy.toString() === currentUser._id.toString();

  if (!isAdmin && !isOwner) {
    throw new Error("FORBIDDEN");
  }

  return book;
};

module.exports = {
  createBook,
  getLibrary,
  getLibraryById,
  updateBook,
  deleteLibrary,
  likeBook,
  unlikeBook,
  getMyBooks,
  getLibraryByIdPrivate,
};
