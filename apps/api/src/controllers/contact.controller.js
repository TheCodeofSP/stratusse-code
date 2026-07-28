const { sendContactEmail } = require("../services/email/email.service");
const { contactSchema } = require("../validations/contact.validation");

const sendContact = async (req, res) => {
  try {
    if (typeof req.body?.website === "string" && req.body.website.length > 0) {
      return res.status(200).json({
        message: "Message envoyé avec succès.",
      });
    }

    const parsedBody = contactSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const { email, message, formStartedAt } = parsedBody.data;

    if (Date.now() - formStartedAt < 1500) {
      return res.status(400).json({
        message:
          "Le formulaire a été envoyé trop rapidement. Merci de réessayer.",
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
