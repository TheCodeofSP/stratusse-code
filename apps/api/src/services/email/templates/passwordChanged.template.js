function passwordChangedTemplate() {
  return {
    subject: "Ton mot de passe a été modifié — Stratusse",

    text: `Ton mot de passe Stratusse vient d'être modifié.

Si tu es à l'origine de cette action, tu n'as rien à faire.

Si tu n'es pas à l'origine de cette action, contacte l'équipe Stratusse dès que possible à contact@stratusse.fr.`,

    html: `
      <div>
        <h1>Mot de passe modifié</h1>

        <p>Ton mot de passe Stratusse vient d'être modifié.</p>

        <p>Si tu es à l'origine de cette action, tu n'as rien à faire.</p>

        <p>Si tu n'es pas à l'origine de cette action, contacte l'équipe Stratusse dès que possible à contact@stratusse.fr.</p>
      </div>
    `,
  };
}

module.exports = {
  passwordChangedTemplate,
};