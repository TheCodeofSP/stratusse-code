const {
  createComment,
  getCommentsByNote,
  deleteComment,
  likeComment,
  unlikeComment,
} = require("../services/comment.service");
const { createCommentSchema } = require("../validations/comment.validation");

const create = async (req, res) => {
  try {
    const parsedBody = createCommentSchema.safeParse(req.body);
    const { noteId } = req.params;

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const comment = await createComment({
      noteId,
      authorId: req.user._id,
      content: parsedBody.data.content,
    });

    return res.status(201).json({
      message: "Réponse créé avec succès.",
      comment,
    });
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({
        message: "Note introuvable.",
      });
    }

    if (error.message === "ARTICLE_NOT_PUBLISHED") {
      return res.status(403).json({
        message: "Impossible de commenter un note non publié.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getByNote = async (req, res) => {
  try {
    const { noteId } = req.params;

    const comments = await getCommentsByNote(noteId);

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteComment(req.params.id, req.user);

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
    const comment = await likeComment(req.params.id, req.user._id);

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

    if (error.message === "SELF_REACTION_NOT_ALLOWED") {
      return res.status(403).json({
        message: "Tu ne peux pas faire résonner ta propre réponse.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const unlike = async (req, res) => {
  try {
    const comment = await unlikeComment(req.params.id, req.user._id);

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
  getByNote,
  remove,
  like,
  unlike,
};
