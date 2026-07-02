const Note = require("../models/Note");
const Comment = require("../models/Comment");
const LibraryRecommendation = require("../models/LibraryRecommendation");
const LibraryComment = require("../models/LibraryComment");

const getAdminNotes = async () => {
  const notes = await Note.find({
    isDeleted: false,
  })
    .populate("author", "pseudo email role")
    .sort({ createdAt: -1 })
    .lean();

  const noteIds = notes.map((note) => note._id);

  const comments = await Comment.find({
    note: { $in: noteIds },
    isDeleted: false,
  }).select("note");

  const commentsMap = comments.reduce((acc, comment) => {
    const noteId = comment.note.toString();

    acc[noteId] = (acc[noteId] || 0) + 1;

    return acc;
  }, {});

  return notes.map((note) => ({
    ...note,

    likesCount: note.likedBy?.length || 0,

    commentsCount: commentsMap[note._id.toString()] || 0,
  }));
};

const getAdminBooks = async () => {
  const books = await LibraryRecommendation.find({
    isDeleted: false,
  })
    .populate("recommendedBy", "pseudo email role")
    .sort({
      createdAt: -1,
    })
    .lean();

  const bookIds = books.map((book) => book._id);

  const comments = await LibraryComment.find({
    book: { $in: bookIds },
    isDeleted: false,
  }).select("book");

  const commentsMap = comments.reduce((acc, comment) => {
    const bookId = comment.book.toString();

    acc[bookId] = (acc[bookId] || 0) + 1;

    return acc;
  }, {});

  return books.map((book) => ({
    ...book,

    likesCount: book.likedBy?.length || 0,

    commentsCount: commentsMap[book._id.toString()] || 0,
  }));
};

const getAdminComments = async () => {
  const comments = await Comment.find({
    isDeleted: false,
  })
    .populate("author", "pseudo email role")
    .populate("note", "title slug status")
    .sort({
      createdAt: -1,
    })
    .lean();

  return comments.map((comment) => ({
    ...comment,

    likesCount: comment.likedBy?.length || 0,
  }));
};

const getAdminLibraryComments = async () => {
  const comments = await LibraryComment.find({
    isDeleted: false,
  })
    .populate("author", "pseudo email role")
    .populate("book", "title author status")
    .sort({
      createdAt: -1,
    })
    .lean();

  return comments.map((comment) => ({
    ...comment,

    likesCount: comment.likedBy?.length || 0,
  }));
};

const deleteAdminNote = async (noteId) => {
  const note = await Note.findById(noteId);

  if (!note || note.isDeleted) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  note.isDeleted = true;

  await note.save();

  return note;
};

const deleteAdminBook = async (bookId) => {
  const book = await LibraryRecommendation.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("BOOK_NOT_FOUND");
  }

  book.isDeleted = true;

  await book.save();

  return book;
};

const deleteAdminComment = async (commentId) => {
  const comment = await Comment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  comment.isDeleted = true;

  await comment.save();

  return comment;
};

const deleteAdminLibraryComment = async (commentId) => {
  const comment = await LibraryComment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  comment.isDeleted = true;

  await comment.save();

  return comment;
};
const getAdminNoteById = async (noteId) => {
  const note = await Note.findById(noteId)
    .populate("author", "pseudo email role")
    .populate("moderation.moderatedBy", "pseudo email role");

  if (!note) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  return note;
};

const getAdminBookById = async (bookId) => {
  const book = await LibraryRecommendation.findById(bookId)
    .populate("recommendedBy", "pseudo email role")
    .populate("moderation.moderatedBy", "pseudo email role");

  if (!book) {
    throw new Error("BOOK_NOT_FOUND");
  }

  return book;
};

module.exports = {
  getAdminNotes,
  getAdminBooks,
  getAdminComments,
  getAdminLibraryComments,
  deleteAdminNote,
  deleteAdminBook,
  deleteAdminComment,
  deleteAdminLibraryComment,
  getAdminNoteById,
  getAdminBookById,
};
