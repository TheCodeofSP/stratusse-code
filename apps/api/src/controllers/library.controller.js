const {
  createBook,
  getLibrary,
  getLibraryById,
  updateBook,
  deleteLibrary,
  likeBook,
  unlikeBook,
  getMyBooks,
  getLibraryByIdPrivate,
} = require("../services/library.service");

const {
  createBookSchema,
  updateBookSchema,
} = require("../validations/library.validation");

const create = async (req, res) => {
  try {
    const parsedBody = createBookSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const book = await createBook({
      ...parsedBody.data,
      recommendedBy: req.user._id,
    });

    return res.status(201).json({
      message: "Livre recommandé avec succès.",
      book,
    });
  } catch (error) {
    if (error.message === "BOOK_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Ce livre existe déjà dans la bibliothèque.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const books = await getLibrary();

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const book = await getLibraryById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Livre introuvable.",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const update = async (req, res) => {
  try {
    const parsedBody = updateBookSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const book = await updateBook(req.params.id, parsedBody.data, req.user);

    return res.status(200).json({
      message: "Recommandation modifiée.",
      book,
    });
  } catch (error) {
    if (error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Livre introuvable.",
      });
    }

    if (error.message === "BOOK_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Ce livre existe déjà dans la bibliothèque.",
      });
    }

    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Vous ne pouvez modifier que vos propres recommandations.",
      });
    }

    if (error.message === "BOOK_TITLE_LOCKED_AFTER_PUBLICATION") {
      return res.status(403).json({
        message:
          "Le titre du livre ne peut plus être modifié après une première publication.",
      });
    }

    if (error.message === "BOOK_AUTHOR_LOCKED_AFTER_PUBLICATION") {
      return res.status(403).json({
        message:
          "L’auteur du livre ne peut plus être modifié après une première publication.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const remove = async (req, res) => {
  try {
    await deleteLibrary(req.params.id, req.user);

    return res.status(200).json({
      message: "Recommandation supprimée.",
    });
  } catch (error) {
    if (error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Livre introuvable.",
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
    const book = await likeBook(req.params.id, req.user._id);

    return res.status(200).json({
      message: "Livre liké.",
      likesCount: book.likedBy.length,
    });
  } catch (error) {
    if (error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Livre introuvable.",
      });
    }

    if (error.message === "SELF_REACTION_NOT_ALLOWED") {
      return res.status(403).json({
        message: "Tu ne peux pas faire résonner ta propre Lecture.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const unlike = async (req, res) => {
  try {
    const book = await unlikeBook(req.params.id, req.user._id);

    return res.status(200).json({
      message: "Like retiré.",
      likesCount: book.likedBy.length,
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

const getMine = async (req, res) => {
  try {
    const books = await getMyBooks(req.user._id);

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getByIdPrivate = async (req, res) => {
  try {
    const book = await getLibraryByIdPrivate(req.params.id, req.user);

    return res.status(200).json(book);
  } catch (error) {
    if (error.message === "BOOK_NOT_FOUND") {
      return res.status(404).json({
        message: "Livre introuvable.",
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
  getById,
  getMine,
  getByIdPrivate,
  update,
  remove,
  like,
  unlike,
};
