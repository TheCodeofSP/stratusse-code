const bcrypt = require("bcryptjs");
const User = require("../models/User");

const Note = require("../models/Note");
const Comment = require("../models/Comment");
const LibraryRecommendation = require("../models/LibraryRecommendation");
const LibraryComment = require("../models/LibraryComment");

const getMyProfile = async (userId) => {
  // BLOG
  const notes = await Note.find({
    author: userId,
  }).sort({ createdAt: -1 });

  const comments = await Comment.find({
    author: userId,
    isDeleted: false,
  })
    .populate("note", "title slug")
    .sort({ createdAt: -1 });

  const likedNotes = await Note.find({
    likedBy: userId,
  })
    .select("title slug excerpt category cloudColor createdAt")
    .sort({ createdAt: -1 });

  const likedComments = await Comment.find({
    likedBy: userId,
    isDeleted: false,
  })
    .populate("note", "title slug")
    .populate("author", "pseudo")
    .sort({ createdAt: -1 });

  // BOOK CLUB
  const libraryBooks = await LibraryRecommendation.find({
    recommendedBy: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  const libraryComments = await LibraryComment.find({
    author: userId,
    isDeleted: false,
  })
    .populate("book", "title author")
    .sort({ createdAt: -1 });

  const likedBooks = await LibraryRecommendation.find({
    likedBy: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });

  const likedLibraryComments = await LibraryComment.find({
    likedBy: userId,
    isDeleted: false,
  })
    .populate("book", "title author")
    .populate("author", "pseudo")
    .sort({ createdAt: -1 });

  // STATS BLOG
  const receivedNoteLikes = notes.reduce(
    (total, note) => total + note.likedBy.length,
    0,
  );

  const receivedCommentLikes = comments.reduce(
    (total, comment) => total + comment.likedBy.length,
    0,
  );

  // STATS BOOK CLUB
  const receivedBookLikes = libraryBooks.reduce(
    (total, book) => total + book.likedBy.length,
    0,
  );

  const receivedLibraryCommentLikes = libraryComments.reduce(
    (total, comment) => total + comment.likedBy.length,
    0,
  );

  return {
    // BLOG
    notes,
    comments,
    likedNotes,
    likedComments,

    // BOOK CLUB
    libraryBooks,
    libraryComments,
    likedBooks,
    likedLibraryComments,

    // STATS
    stats: {
      notesCount: notes.length,
      commentsCount: comments.length,
      likedNotesCount: likedNotes.length,
      likedCommentsCount: likedComments.length,
      receivedNoteLikes,
      receivedCommentLikes,

      booksCount: libraryBooks.length,
      libraryCommentsCount: libraryComments.length,
      likedBooksCount: likedBooks.length,
      likedLibraryCommentsCount: likedLibraryComments.length,
      receivedBookLikes,
      receivedLibraryCommentLikes,
    },
  };
};

const getMyProfileStats = async (userId) => {
  // Notes créées par l'utilisateur
  const notes = await Note.find({
    author: userId,
    isDeleted: false,
  }).select("status likedBy");

  const noteDrafts = notes.filter((note) => note.status === "draft");
  const publishedNotes = notes.filter((note) => note.status === "published");

  const peopleReached = publishedNotes.reduce(
    (total, note) => total + note.likedBy.length,
    0,
  );

  // Participation de l'utilisateur côté Notes
  const noteCommentsCount = await Comment.countDocuments({
    author: userId,
    isDeleted: false,
  });

  const noteReactionsCount = await Note.countDocuments({
    likedBy: userId,
    isDeleted: false,
  });

  // Livres de bibliothèque créés par l'utilisateur
  const books = await LibraryRecommendation.find({
    recommendedBy: userId,
    isDeleted: false,
  }).select("status likedBy");

  

  const bookDrafts = books.filter((book) => book.status === "draft");
  const publishedBooks = books.filter((book) => book.status === "published");

  const peopleInfluenced = publishedBooks.reduce(
    (total, book) => total + book.likedBy.length,
    0,
  );

  // Participation de l'utilisateur côté Bibliothèque
  const bookCommentsCount = await LibraryComment.countDocuments({
    author: userId,
    isDeleted: false,
  });

  const bookReactionsCount = await LibraryRecommendation.countDocuments({
    likedBy: userId,
    isDeleted: false,
  });

  return {
    notes: {
      draftsCount: noteDrafts.length,
      publishedCount: publishedNotes.length,
      peopleReached,
      commentsCount: noteCommentsCount,
      reactionsCount: noteReactionsCount,
    },
    books: {
      draftsCount: bookDrafts.length,
      publishedCount: publishedBooks.length,
      peopleInfluenced,
      commentsCount: bookCommentsCount,
      reactionsCount: bookReactionsCount,
    },
  };
};

const updateMyPassword = async ({ userId, currentPassword, newPassword }) => {
  const user = await User.findById(userId);

  if (!user || user.isDeleted) {
    throw new Error("USER_NOT_FOUND");
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error("INVALID_CURRENT_PASSWORD");
  }

  user.passwordHash = await bcrypt.hash(newPassword, 10);

  await user.save();

  return true;
};

const deleteMyAccount = async ({ userId, deletionComment = "" }) => {
  const user = await User.findById(userId);

  if (!user || user.isDeleted) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.role === "admin") {
    throw new Error("ADMIN_ACCOUNT_DELETION_FORBIDDEN");
  }

  user.isDeleted = true;
  user.deletedAt = new Date();
  user.deletionComment = deletionComment;
  user.isBanned = true;
  user.email = `deleted-user-${user._id}@stratusse.local`;
  user.pseudo = "Utilisateur supprimé";
  user.role = "observer";
  user.isApprovedCreator = false;
  user.creatorApproval = {
    isApproved: false,
    approvedBy: null,
    approvedAt: null,
  };

  await user.save();

  return true;
};

module.exports = {
  getMyProfile,
  getMyProfileStats,
  updateMyPassword,
  deleteMyAccount,
};
