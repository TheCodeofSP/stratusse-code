const {
  stratusseEmailLayout,
} = require("../layout/stratusseEmailLayout");

function verifyEmailTemplate({ verificationUrl }) {
  const { html, text } = stratusseEmailLayout({
    title: "Encore une étape avant d’ouvrir ton espace",
    paragraphs: [
      "Bienvenue sur Stratusse.",
      "Pour confirmer ton adresse email et accéder à ton espace, clique sur le bouton ci-dessous.",
    ],
    buttonLabel: "Confirmer mon adresse email",
    buttonUrl: verificationUrl,
    secondaryText:
      "Si tu n’es pas à l’origine de cette inscription, tu peux ignorer cet email.",
  });

  return {
    subject: "Confirme ton adresse email — Stratusse",
    html,
    text,
  };
}

module.exports = {
  verifyEmailTemplate,
};