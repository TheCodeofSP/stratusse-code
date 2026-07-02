const {
  getMyProfile,
  getMyProfileStats,
  updateMyPassword,
  deleteMyAccount,
} = require("../services/profile.service");

const {
  updatePasswordSchema,
  deleteAccountSchema,
} = require("../validations/profile.validation");

const getMe = async (req, res) => {
  try {
    const profile = await getMyProfile(req.user._id);

    return res.status(200).json({
      user: req.user,
      ...profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await getMyProfileStats(req.user._id);

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const parsedBody = updatePasswordSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    await updateMyPassword({
      userId: req.user._id,
      currentPassword: parsedBody.data.currentPassword,
      newPassword: parsedBody.data.newPassword,
    });

    return res.status(200).json({
      message: "Mot de passe modifié.",
    });
  } catch (error) {
    if (error.message === "INVALID_CURRENT_PASSWORD") {
      return res.status(401).json({
        message: "Mot de passe actuel incorrect.",
      });
    }

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

const deleteAccount = async (req, res) => {
  try {
    const parsedBody = deleteAccountSchema.safeParse(req.body || {});

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    await deleteMyAccount({
      userId: req.user._id,
      deletionComment: parsedBody.data.deletionComment,
    });

    return res.status(200).json({
      message: "Compte supprimé.",
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

module.exports = {
  getMe,
  getStats,
  updatePassword,
  deleteAccount,
};
