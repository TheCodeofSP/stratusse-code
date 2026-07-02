const {
  getPublicCreatorProfile,
} = require("../services/creator.service");

const getByPseudo = async (req, res) => {
  try {
    const profile = await getPublicCreatorProfile(req.params.pseudo);

    return res.status(200).json(profile);
  } catch (error) {
    if (error.message === "CREATOR_NOT_FOUND") {
      return res.status(404).json({
        message: "Voix introuvable.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  getByPseudo,
};