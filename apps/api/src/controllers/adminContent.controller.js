const {
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
} = require("../services/adminContent.service");

const { moderateContent } = require("../services/moderation.service");

const {
  moderateContentSchema,
} = require("../validations/moderation.validation");

const getNotes = async (req, res) => {
  try {
    const notes = await getAdminNotes();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const getLibrary = async (req, res) => {
  try {
    const books = await getAdminBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await getAdminComments();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const getLibraryComments = async (req, res) => {
  try {
    const comments = await getAdminLibraryComments();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const removeNote = async (req, res) => {
  try {
    await deleteAdminNote(req.params.id);
    return res.status(200).json({ message: "Note supprimé." });
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({ message: "Note introuvable." });
    }

    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const removeBook = async (req, res) => {
  try {
    await deleteAdminBook(req.params.id);
    return res.status(200).json({ message: "Recommandation supprimée." });
  } catch (error) {
    if (error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({ message: "Livre introuvable." });
    }

    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const removeComment = async (req, res) => {
  try {
    await deleteAdminComment(req.params.id);
    return res.status(200).json({ message: "Réponse supprimé." });
  } catch (error) {
    if (error.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({ message: "Réponse introuvable." });
    }

    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const removeLibraryComment = async (req, res) => {
  try {
    await deleteAdminLibraryComment(req.params.id);
    return res
      .status(200)
      .json({ message: "Réaction Bibliothèque supprimée." });
  } catch (error) {
    if (error.message === "COMMENT_NOT_FOUND") {
      return res.status(404).json({ message: "Réaction introuvable." });
    }

    return res.status(500).json({ message: "Erreur serveur." });
  }
};

const moderate = (contentType) => {
  return async (req, res) => {
    try {
      const parsedBody = moderateContentSchema.safeParse(req.body || {});

      if (!parsedBody.success) {
        return res.status(400).json({
          message: parsedBody.error.issues[0].message,
        });
      }

      const content = await moderateContent({
        contentType,
        contentId: req.params.id,
        adminId: req.user._id,
        reason: parsedBody.data.reason,
        adminComment: parsedBody.data.adminComment,
      });

      return res.status(200).json({
        message: "Contenu modéré.",
        content,
      });
    } catch (error) {
      if (error.message === "CONTENT_NOT_FOUND") {
        return res.status(404).json({
          message: "Contenu introuvable.",
        });
      }

      if (error.message === "INVALID_CONTENT_TYPE") {
        return res.status(400).json({
          message: "Type de contenu invalide.",
        });
      }

      return res.status(500).json({
        message: "Erreur serveur.",
      });
    }
  };
};

const getNoteById = async (req, res) => {
  try {
    const note = await getAdminNoteById(req.params.id);

    return res.status(200).json(note);
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({
        message: "Note introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getLibraryById = async (req, res) => {
  try {
    const book = await getAdminBookById(req.params.id);

    return res.status(200).json(book);
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

module.exports = {
  getNotes,
  getLibrary,
  getComments,
  getLibraryComments,
  removeNote,
  removeBook,
  removeComment,
  removeLibraryComment,
  moderate,
  getNoteById,
  getLibraryById,
};
