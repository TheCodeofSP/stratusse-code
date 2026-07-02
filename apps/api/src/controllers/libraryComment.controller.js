const {
  createLibraryComment,
  getCommentsByBook,
  deleteLibraryComment,
  likeLibraryComment,
  unlikeLibraryComment,
} = require("../services/libraryComment.service");

const create = async (req, res) => {
  try {
    const { content } = req.body;
    const { bookId } = req.params;

    if (!content) {
      return res.status(400).json({
        message: "Le commentaire ne peut pas être vide.",
      });
    }

    const comment = await createLibraryComment({
      bookId,
      authorId: req.user._id,
      content,
    });

    return res.status(201).json({
      message: "Réponse créé avec succès.",
      comment,
    });
  } catch (error) {
    if (error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Livre introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getByBook = async (req, res) => {
  try {
    const comments = await getCommentsByBook(req.params.bookId);

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteLibraryComment(req.params.id, req.user);

    return res.status(200).json({
      message: "Réponse supprimé.",
    });
  } catch (error) {
    if (error.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({
        message: "Réponse introuvable.",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Accès interdit.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const like = async (req, res) => {
  try {
    const comment = await likeLibraryComment(req.params.id, req.user._id);

    return res.status(200).json({
      message: "Réponse liké.",
      likesCount: comment.likedBy.length,
    });
  } catch (error) {
    if (error.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({
        message: "Réponse introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const unlike = async (req, res) => {
  try {
    const comment = await unlikeLibraryComment(req.params.id, req.user._id);

    return res.status(200).json({
      message: "Like retiré.",
      likesCount: comment.likedBy.length,
    });
  } catch (error) {
    if (error.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({
        message: "Réponse introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  create,
  getByBook,
  remove,
  like,
  unlike,
};
