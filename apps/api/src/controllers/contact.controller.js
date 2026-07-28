const { sendContactEmail } = require("../services/email/email.service");
const { contactSchema } = require("../validations/contact.validation");

const sendContact = async (req, res) => {
  try {
    const parsedBody = contactSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const { email, message } = parsedBody.data;

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
