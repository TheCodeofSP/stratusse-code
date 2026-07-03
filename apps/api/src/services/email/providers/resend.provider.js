const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY manquante.");
  }

  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM manquante.");
  }

  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
    reply_to: replyTo,
  });
}

module.exports = {
  sendEmail,
};