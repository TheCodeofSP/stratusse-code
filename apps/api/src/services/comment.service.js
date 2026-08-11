const Note = require("../models/Note");
const Comment = require("../models/Comment");

const createComment = async ({ noteId, authorId, content }) => {
  const note = await Note.findById(noteId);

  if (!note) {
    throw new Error("ARTICLE_NOT_FOUND");
  }

  if (note.status !== "published") {
    throw new Error("ARTICLE_NOT_PUBLISHED");
  }

  const comment = await Comment.create({
    note: noteId,
    author: authorId,
    content,
  });

  return comment.populate("author", "pseudo role");
};

const getCommentsByNote = async (noteId) => {
  const comments = await Comment.find({
    note: noteId,
    isDeleted: false,
  })
    .populate("author", "pseudo role")
    .sort({ createdAt: 1 });

  return comments;
};

const deleteComment = async (commentId, currentUser) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
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

const likeComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

  if (!comment || comment.isDeleted) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  if (comment.author.toString() === userId.toString()) {
    throw new Error("SELF_REACTION_NOT_ALLOWED");
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

const unlikeComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);

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
  createComment,
  getCommentsByNote,
  deleteComment,
  likeComment,
  unlikeComment,
};
