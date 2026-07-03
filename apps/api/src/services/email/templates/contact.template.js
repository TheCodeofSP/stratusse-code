const {
  stratusseEmailLayout,
} = require("../layout/stratusseEmailLayout");

function contactTemplate({ email, message }) {
  const { html, text } = stratusseEmailLayout({
    title: "Nouveau message reçu depuis Stratusse",
    paragraphs: [
      `Adresse de réponse : ${email}`,
      "Message reçu :",
      message,
    ],
    secondaryText:
      "Ce message a été envoyé depuis le formulaire de contact de Stratusse.",
  });

  return {
    subject: "Nouveau message — Stratusse",
    html,
    text,
  };
}

module.exports = {
  contactTemplate,
};