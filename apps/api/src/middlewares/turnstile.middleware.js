const {
  verifyTurnstileToken,
} = require("../services/turnstile.service");
const { getClientIp } = require("../utils/requestKey.utils");

const requireTurnstile = async (req, res, next) => {
  try {
    const isValid = await verifyTurnstileToken({
      token: req.body?.captchaToken,
      remoteIp: getClientIp(req),
    });

    if (!isValid) {
      return res.status(400).json({
        message: "La vérification de sécurité a échoué. Merci de réessayer.",
        code: "CAPTCHA_INVALID",
      });
    }

    return next();
  } catch (error) {
    console.error("Erreur Turnstile :", error);

    return res.status(503).json({
      message:
        "La vérification de sécurité est momentanément indisponible. Merci de réessayer.",
      code: "CAPTCHA_UNAVAILABLE",
    });
  }
};

module.exports = {
  requireTurnstile,
};
