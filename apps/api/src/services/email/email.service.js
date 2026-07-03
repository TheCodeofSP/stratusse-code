const { sendEmail } = require("./providers/resend.provider");

const { contactTemplate } = require("./templates/contact.template");
const { verifyEmailTemplate } = require("./templates/verifyEmail.template");
const { forgotPasswordTemplate } = require("./templates/forgotPassword.template");
const { passwordChangedTemplate } = require("./templates/passwordChanged.template");
const { accountDeletedTemplate } = require("./templates/accountDeleted.template");

async function sendVerificationEmail({ to, verificationUrl }) {
  const template = verifyEmailTemplate({ verificationUrl });

  return sendEmail({
    to,
    ...template,
  });
}

async function sendForgotPasswordEmail({ to, resetUrl }) {
  const template = forgotPasswordTemplate({ resetUrl });

  return sendEmail({
    to,
    ...template,
  });
}

async function sendPasswordChangedEmail({ to }) {
  const template = passwordChangedTemplate();

  return sendEmail({
    to,
    ...template,
  });
}

async function sendAccountDeletedEmail({ to }) {
  const template = accountDeletedTemplate();

  return sendEmail({
    to,
    ...template,
  });
}

async function sendContactEmail({ email, message }) {
  const template = contactTemplate({ email, message });

  return sendEmail({
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    ...template,
  });
}

module.exports = {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
  sendAccountDeletedEmail,
  sendContactEmail,
};