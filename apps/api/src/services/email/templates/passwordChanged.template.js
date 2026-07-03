const {
  stratusseEmailLayout,
} = require("../layout/stratusseEmailLayout");

function passwordChangedTemplate() {
  const { html, text } = stratusseEmailLayout({
    title: "Ton mot de passe a bien été modifié",
    paragraphs: [
      "Nous te confirmons que le mot de passe de ton compte Stratusse vient d’être modifié.",
      "Si cette action vient de toi, tout est en ordre.",
    ],
    secondaryText:
      "Si tu n’es pas à l’origine de cette modification, contacte Stratusse dès que possible.",
  });

  return {
    subject: "Mot de passe modifié — Stratusse",
    html,
    text,
  };
}

module.exports = {
  passwordChangedTemplate,
};