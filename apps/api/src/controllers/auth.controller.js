const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} = require("../services/auth.service");

const {
  registerSchema,
  loginSchema,
  resendVerificationEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validations/auth.validation");

const {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendPasswordChangedEmail,
} = require("../services/email/email.service");
const LoginAttempt = require("../models/LoginAttempt");
const {
  verifyTurnstileToken,
} = require("../services/turnstile.service");
const {
  clearAuthCookie,
  setAuthCookie,
} = require("../utils/authCookie.utils");
const {
  getClientIp,
  hashRequestKey,
} = require("../utils/requestKey.utils");

const LOGIN_CAPTCHA_THRESHOLD = 3;
const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

const getLoginAttemptKey = (req, email) =>
  hashRequestKey(
    "login-attempt",
    getClientIp(req),
    email.trim().toLowerCase(),
  );

const getLoginAttempts = async (key) => {
  const record = await LoginAttempt.findOne({
    key,
    expiresAt: { $gt: new Date() },
  }).lean();

  return record?.attempts || 0;
};

const recordFailedLogin = async (key) => {
  const expiresAt = new Date(Date.now() + LOGIN_ATTEMPT_WINDOW_MS);

  const record = await LoginAttempt.findOneAndUpdate(
    { key },
    {
      $inc: { attempts: 1 },
      $set: { expiresAt },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return record.attempts;
};

const register = async (req, res) => {
  try {
    const parsedBody = registerSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const {
      email,
      password,
      pseudo,
      hasAcceptedCharter,
      hasAcceptedTerms,
      hasAcceptedPrivacy,
    } = parsedBody.data;

    const result = await registerUser({
      email,
      password,
      pseudo,
      hasAcceptedCharter,
      hasAcceptedTerms,
      hasAcceptedPrivacy,
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${result.emailVerificationToken}`;

    await sendVerificationEmail({
      to: email,
      verificationUrl,
    });

    return res.status(201).json({
      message: "Compte créé. Un email de confirmation a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur register :", error);

    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Cette adresse email est déjà utilisée.",
      });
    }

    if (error.message === "PSEUDO_ALREADY_EXISTS") {
      return res.status(409).json({
        message: "Ce pseudo est déjà utilisé.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const login = async (req, res) => {
  let attemptKey;

  try {
    const parsedBody = loginSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const { email, password, captchaToken } = parsedBody.data;
    attemptKey = getLoginAttemptKey(req, email);

    const attempts = await getLoginAttempts(attemptKey);

    if (attempts >= LOGIN_CAPTCHA_THRESHOLD) {
      const captchaIsValid = await verifyTurnstileToken({
        token: captchaToken,
        remoteIp: getClientIp(req),
      });

      if (!captchaIsValid) {
        return res.status(400).json({
          message: "Merci de confirmer que vous n’êtes pas un robot.",
          code: "CAPTCHA_REQUIRED",
          captchaRequired: true,
        });
      }
    }

    const result = await loginUser({
      email,
      password,
    });

    await LoginAttempt.deleteOne({ key: attemptKey });
    setAuthCookie(res, result.token);

    return res.status(200).json({
      message: "Connexion réussie.",
      user: result.user,
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      const attempts = attemptKey
        ? await recordFailedLogin(attemptKey)
        : LOGIN_CAPTCHA_THRESHOLD;

      return res.status(401).json({
        message: "Identifiants invalides.",
        captchaRequired: attempts >= LOGIN_CAPTCHA_THRESHOLD,
      });
    }

    if (error.message === "TURNSTILE_UNAVAILABLE") {
      return res.status(503).json({
        message:
          "La vérification de sécurité est momentanément indisponible.",
        code: "CAPTCHA_UNAVAILABLE",
        captchaRequired: true,
      });
    }

    if (error.message === "USER_BANNED") {
      return res.status(403).json({
        message: "Compte banni.",
      });
    }

    if (error.message === "EMAIL_NOT_VERIFIED") {
      return res.status(403).json({
        message:
          "Veuillez confirmer votre adresse email avant de vous connecter.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const me = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

const logoutController = async (req, res) => {
  clearAuthCookie(res);

  return res.status(200).json({
    message: "Déconnexion réussie.",
  });
};

const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Token manquant.",
      });
    }

    const result = await verifyEmail(token);
    setAuthCookie(res, result.token);

    return res.status(200).json({
      message: "Email confirmé.",
      user: result.user,
    });
  } catch (error) {
    if (error.message === "INVALID_OR_EXPIRED_TOKEN") {
      return res.status(400).json({
        message: "Lien de confirmation invalide ou expiré.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const resendVerificationEmailController = async (req, res) => {
  try {
    const parsedBody = resendVerificationEmailSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const rawToken = await resendVerificationEmail(parsedBody.data.email);

    if (rawToken) {
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

      await sendVerificationEmail({
        to: parsedBody.data.email,
        verificationUrl,
      });
    }

    return res.status(200).json({
      message: "Si un compte existe, un email de confirmation a été envoyé.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const parsedBody = forgotPasswordSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const rawToken = await forgotPassword({
      email: parsedBody.data.email,
      pseudo: parsedBody.data.pseudo,
    });

    if (rawToken) {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

      await sendForgotPasswordEmail({
        to: parsedBody.data.email,
        resetUrl,
      });
    }

    return res.status(200).json({
      message:
        "Si les informations correspondent à un compte, un email de réinitialisation a été envoyé.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const parsedBody = resetPasswordSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const result = await resetPassword({
      token: parsedBody.data.token,
      password: parsedBody.data.password,
    });

    await sendPasswordChangedEmail({
      to: result.email,
    });

    return res.status(200).json({
      message: "Mot de passe réinitialisé.",
    });
  } catch (error) {
    if (error.message === "INVALID_OR_EXPIRED_TOKEN") {
      return res.status(400).json({
        message: "Lien de réinitialisation invalide ou expiré.",
      });
    }

    return res.status(500).json({
      message: "Erreur serveur.",
    });
  }
};

module.exports = {
  register,
  login,
  logoutController,
  me,
  verifyEmailController,
  resendVerificationEmailController,
  forgotPasswordController,
  resetPasswordController,
};
