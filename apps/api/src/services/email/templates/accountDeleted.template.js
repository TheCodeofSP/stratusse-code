function accountDeletedTemplate() {
  return {
    subject: "Ton compte a été supprimé — Stratusse",

    text: `Ton compte Stratusse vient d'être supprimé.

Si tu es à l'origine de cette action, aucune action supplémentaire n'est nécessaire.

Si tu n'es pas à l'origine de cette action, contacte l'équipe Stratusse dès que possible à contact@stratusse.fr.`,

    html: `
      <div>
        <h1>Compte supprimé</h1>

        <p>Ton compte Stratusse vient d'être supprimé.</p>

        <p>Si tu es à l'origine de cette action, aucune action supplémentaire n'est nécessaire.</p>

        <p>Si tu n'es pas à l'origine de cette action, contacte l'équipe Stratusse dès que possible à contact@stratusse.fr.</p>
      </div>
    `,
  };
}

module.exports = {
  accountDeletedTemplate,
};