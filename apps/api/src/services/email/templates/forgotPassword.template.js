const {
  stratusseEmailLayout,
} = require("../layout/stratusseEmailLayout");

function forgotPasswordTemplate({ resetUrl }) {
  const { html, text } = stratusseEmailLayout({
    title: "Créer un nouveau mot de passe",
    paragraphs: [
      "Une demande de réinitialisation de mot de passe a été faite pour ton compte Stratusse.",
      "Tu peux choisir un nouveau mot de passe en cliquant sur le bouton ci-dessous.",
    ],
    buttonLabel: "Modifier mon mot de passe",
    buttonUrl: resetUrl,
    secondaryText:
      "Si tu n’es pas à l’origine de cette demande, tu peux ignorer cet email.",
  });

  return {
    subject: "Réinitialisation de ton mot de passe — Stratusse",
    html,
    text,
  };
}

module.exports = {
  forgotPasswordTemplate,
};