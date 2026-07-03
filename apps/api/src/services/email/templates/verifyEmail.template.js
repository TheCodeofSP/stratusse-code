function verifyEmailTemplate({ verificationUrl }) {
  return {
    subject: "Confirme ton adresse email — Stratusse",

    text: `Bienvenue sur Stratusse.

Pour confirmer ton adresse email, ouvre ce lien :
${verificationUrl}

Si tu n'es pas à l'origine de cette inscription, tu peux ignorer cet email.`,

    html: `
      <div>
        <h1>Bienvenue sur Stratusse</h1>

        <p>Encore une étape avant d’ouvrir ton espace.</p>

        <p>
          <a href="${verificationUrl}">
            Confirmer mon adresse email
          </a>
        </p>

        <p>Si tu n'es pas à l'origine de cette inscription, tu peux ignorer cet email.</p>
      </div>
    `,
  };
}

module.exports = {
  verifyEmailTemplate,
};