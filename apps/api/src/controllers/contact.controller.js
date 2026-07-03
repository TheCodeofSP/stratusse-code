const { sendContactEmail } = require("../services/email/email.service");

const sendContact = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({
        message: "Adresse email et message obligatoires.",
      });
    }

    await sendContactEmail({
      email,
      message,
    });

    return res.status(200).json({
      message: "Message envoyé avec succès.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Impossible d'envoyer le message pour le moment.",
    });
  }
};

module.exports = {
  sendContact,
};