function contactTemplate({ email, message }) {
  return {
    subject: "Nouveau message depuis Stratusse",

    text: `Nouveau message reçu depuis Stratusse.

Adresse email :
${email}

Message :
${message}`,

    html: `
      <div>
        <h1>Nouveau message depuis Stratusse</h1>

        <p><strong>Adresse email :</strong> ${email}</p>

        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  };
}

module.exports = {
  contactTemplate,
};