const {
  stratusseEmailLayout,
} = require("../layout/stratusseEmailLayout");

function accountDeletedTemplate() {
  const { html, text } = stratusseEmailLayout({
    title: "Ton compte Stratusse a été supprimé",
    paragraphs: [
      "Nous te confirmons que ton compte Stratusse a bien été supprimé.",
      "Merci d’avoir pris part à cette Safe Place, même pour un instant.",
    ],
    secondaryText:
      "Si cette suppression n’est pas de ton fait, contacte Stratusse dès que possible.",
  });

  return {
    subject: "Compte supprimé — Stratusse",
    html,
    text,
  };
}

module.exports = {
  accountDeletedTemplate,
};