function forgotPasswordTemplate({ resetUrl }) {
  return {
    subject: "Réinitialiser ton mot de passe — Stratusse",

    text: `Une demande de réinitialisation de mot de passe a été faite pour ton compte Stratusse.

Pour créer un nouveau mot de passe, ouvre ce lien :
${resetUrl}

Si tu n'es pas à l'origine de cette demande, tu peux ignorer cet email.`,

    html: `
      <div>
        <h1>Réinitialiser ton mot de passe</h1>

        <p>Une demande de réinitialisation de mot de passe a été faite pour ton compte Stratusse.</p>

        <p>
          <a href="${resetUrl}">
            Créer un nouveau mot de passe
          </a>
        </p>

        <p>Si tu n'es pas à l'origine de cette demande, tu peux ignorer cet email.</p>
      </div>
    `,
  };
}

module.exports = {
  forgotPasswordTemplate,
};