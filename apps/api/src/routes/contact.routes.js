const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Message contact reçu :", req.body);

    return res.status(200).json({
      message: "Message reçu.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Impossible d’envoyer le message pour le moment.",
    });
  }
});

module.exports = router;