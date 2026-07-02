const LibraryRecommendation = require("../models/LibraryRecommendation");
const LibraryComment = require("../models/LibraryComment");

const createLibraryComment = async ({ bookId, authorId, content }) => {
  const book = await LibraryRecommendation.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("BOOK_NOT_FOUND");
  }

  const comment = await LibraryComment.create({
    book: bookId,
    author: authorId,
    content,
  });

  return comment.populate("author", "pseudo role");
};

const getCommentsByBook = async (bookId) => {
  const comments = await LibraryComment.find({
    book: bookId,
    isDeleted: false,
  })
    .populate("author", "pseudo role")
    .sort({ createdAt: 1 });

  return comments;
};

const deleteLibraryComment = async (commentId, currentUser) => {
  const comment = await LibraryComment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  const isAdmin = currentUser.role === "admin";
  const isOwner = comment.author.toString() === currentUser._id.toString();

  if (!isAdmin && !isOwner) {
    throw new Error("FORBIDDEN");
  }

  comment.isDeleted = true;

  await comment.save();

  return comment;
};

const likeLibraryComment = async (commentId, userId) => {
  const comment = await LibraryComment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  const alreadyLiked = comment.likedBy.some(
    (id) => id.toString() === userId.toString(),
  );

  if (!alreadyLiked) {
    comment.likedBy.push(userId);
    await comment.save();
  }

  return comment;
};

const unlikeLibraryComment = async (commentId, userId) => {
  const comment = await LibraryComment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  comment.likedBy = comment.likedBy.filter(
    (id) => id.toString() !== userId.toString(),
  );

  await comment.save();

  return comment;
};

module.exports = {
  createLibraryComment,
  getCommentsByBook,
  deleteLibraryComment,
  likeLibraryComment,
  unlikeLibraryComment,
};
