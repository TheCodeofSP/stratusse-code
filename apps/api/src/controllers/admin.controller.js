const {
  getAllUsers,
  updateUserRole,
  toggleUserBan,
  approveCreator,
  getAdminDashboardStats,
  getUserByIdForAdmin,
  getUserActivitySummary,
  getUserNotes,
  getUserBooks,
  getUserComments,
  getUserLibraryComments,
  getAdminNoteById,
  getAdminBookById,
} = require("../services/admin.service");

const {
  getAdminActionLogs,
  getAdminActionLogsByUser,
} = require("../services/adminActionLog.service");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { role, comment = "" } = req.body;

    const user = await updateUserRole({
      userId: req.params.id,
      role,
      adminId: req.user._id,
      comment,
    });

    return res.status(200).json({
      message: "Rôle mis à jour.",
      user,
    });
  } catch (error) {
    if (error.message === "INVALID_ROLE") {
      return res.status(400).json({
        message: "Rôle invalide.",
      });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    if (error.message === "CANNOT_UPDATE_OWN_ROLE") {
      return res.status(403).json({
        message: "Vous ne pouvez pas modifier votre propre rôle.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const updateBan = async (req, res) => {
  try {
    const { isBanned, comment = "" } = req.body;

    const user = await toggleUserBan({
      userId: req.params.id,
      isBanned,
      adminId: req.user._id,
      comment,
    });

    return res.status(200).json({
      message: isBanned ? "Utilisateur banni." : "Utilisateur réactivé.",
      user,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const updateCreatorApproval = async (req, res) => {
  try {
    const { isApprovedCreator, comment = "" } = req.body;

    const user = await approveCreator(
      req.params.id,
      isApprovedCreator,
      req.user._id,
      comment,
    );

    return res.status(200).json({
      message: isApprovedCreator
        ? "Voix approuvé."
        : "Voix désapprouvé.",
      user,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const stats = await getAdminDashboardStats();

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getActions = async (req, res) => {
  try {
    const logs = await getAdminActionLogs();

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserActions = async (req, res) => {
  try {
    const logs = await getAdminActionLogsByUser(req.params.id);

    return res.status(200).json(logs);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdForAdmin(req.params.id);

    return res.status(200).json(user);
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "Utilisateur introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserActivitySummaryController = async (req, res) => {
  try {
    const summary = await getUserActivitySummary(req.params.id);

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserNotesController = async (req, res) => {
  try {
    const notes = await getUserNotes(req.params.id);

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserBooksController = async (req, res) => {
  try {
    const books = await getUserBooks(req.params.id);

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserCommentsController = async (req, res) => {
  try {
    const comments = await getUserComments(req.params.id);

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getUserLibraryCommentsController = async (req, res) => {
  try {
    const comments = await getUserLibraryComments(req.params.id);

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
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
  getUsers,
  updateRole,
  updateBan,
  updateCreatorApproval,
  getDashboard,
  getActions,
  getUserActions,
  getUserById,
  getUserActivitySummaryController,
  getUserNotesController,
  getUserBooksController,
  getUserCommentsController,
  getUserLibraryCommentsController,
  getNoteById,
  getLibraryById,
};
