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

const register = async (req, res) => {
  try {
    const parsedBody = registerSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const { email, password, pseudo, hasAcceptedCharter } = parsedBody.data;

    const result = await registerUser({
      email,
      password,
      pseudo,
      hasAcceptedCharter,
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${result.emailVerificationToken}`;

    console.log("EMAIL VERIFICATION URL:", verificationUrl);

    return res.status(201).json({
      message: "Compte créé. Un email de confirmation a été envoyé.",
    });
  } catch (error) {
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
  try {
    const parsedBody = loginSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        message: parsedBody.error.issues[0].message,
      });
    }

    const { email, password } = parsedBody.data;

    const result = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      message: "Connexion réussie.",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Identifiants invalides.",
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

const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Token manquant.",
      });
    }

    const result = await verifyEmail(token);

    return res.status(200).json({
      message: "Email confirmé.",
      token: result.token,
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

      console.log("EMAIL VERIFICATION URL:", verificationUrl);
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

    const rawToken = await forgotPassword(parsedBody.data.email);

    if (rawToken) {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

      console.log("PASSWORD RESET URL:", resetUrl);
    }

    return res.status(200).json({
      message: "Si un compte existe, un email de réinitialisation a été envoyé.",
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

    await resetPassword({
      token: parsedBody.data.token,
      password: parsedBody.data.password,
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
  me,
  verifyEmailController,
  resendVerificationEmailController,
  forgotPasswordController,
  resetPasswordController
};
