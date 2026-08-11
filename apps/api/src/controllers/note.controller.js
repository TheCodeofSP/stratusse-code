const {
  createNoteSchema,
  updateNoteSchema,
} = require("../validations/note.validation");

const {
  createNote,
  getPublishedNotes,
  getPublishedNoteBySlug,
  updateNote,
  deleteNote,
  getAllNotesForAdmin,
  likeNote,
  unlikeNote,
  getMyNotes,
  getNoteById,
} = require("../services/note.service");

const create = async (req, res) => {
  try {
    const parsedBody = createNoteSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const note = await createNote({
      ...parsedBody.data,
      author: req.user._id,
    });

    return res.status(201).json({
      message: "Note créé avec succès.",
      note,
    });
  } catch (error) {
    if (error.message === "ARTICLE_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Un note avec ce titre existe déjà.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const notes = await getPublishedNotes();

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const note = await getPublishedNoteBySlug(slug);

    if (!note) {
      return res.status(404).json({
        message: "Note introuvable.",
      });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const update = async (req, res) => {
  try {
    const parsedBody = updateNoteSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const note = await updateNote(req.params.id, parsedBody.data, req.user);

    return res.status(200).json({
      message: "Note modifié avec succès.",
      note,
    });
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({
        message: "Note introuvable.",
      });
    }

    if (error.message === "ARTICLE_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Un note avec ce titre existe déjà.",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Vous ne pouvez modifier que vos propres notes.",
      });
    }

    if (error.message === "TITLE_LOCKED_AFTER_PUBLICATION") {
      return res.status(403).json({
        message:
          "Le titre ne peut plus être modifié après une première publication.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteNote(req.params.id, req.user);

    return res.status(200).json({
      message: "Note supprimé avec succès.",
    });
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({
        message: "Note introuvable.",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Vous ne pouvez supprimer que vos propres notes.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getAdminNotes = async (req, res) => {
  try {
    const notes = await getAllNotesForAdmin();

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const like = async (req, res) => {
  try {
    const note = await likeNote(req.params.id, req.user._id);

    return res.status(200).json({
      message: "Note liké.",
      likesCount: note.likedBy.length,
    });
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({
        message: "Note introuvable.",
      });
    }

    if (error.message === "SELF_REACTION_NOT_ALLOWED") {
      return res.status(403).json({
        message: "Tu ne peux pas faire résonner ta propre Note.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const unlike = async (req, res) => {
  try {
    const note = await unlikeNote(req.params.id, req.user._id);

    return res.status(200).json({
      message: "Like retiré.",
      likesCount: note.likedBy.length,
    });
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

const getMine = async (req, res) => {
  try {
    const notes = await getMyNotes(req.user._id);

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const note = await getNoteById(req.params.id, req.user);

    return res.status(200).json(note);
  } catch (error) {
    if (error.message === "ARTICLE_NOT_FOUND") {
      return res.status(404).json({
        message: "Note introuvable.",
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

module.exports = {
  create,
  getAll,
  getBySlug,
  update,
  remove,
  getAdminNotes,
  like,
  unlike,
  getMine,
  getById,
};
