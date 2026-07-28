const { AUTH_COOKIE_NAME } = require("../utils/authCookie.utils");

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const csrfOriginProtection = (req, res, next) => {
  if (SAFE_METHODS.has(req.method) || !req.cookies?.[AUTH_COOKIE_NAME]) {
    return next();
  }

  const origin = req.get("origin");
  const allowedOrigins = new Set([
    "http://localhost:5173",
    "https://stratusse-web.vercel.app",
    "https://stratusse.fr",
    "https://www.stratusse.fr",
    process.env.FRONTEND_URL,
  ]);

  if (!origin || !allowedOrigins.has(origin)) {
    return res.status(403).json({
      message: "Origine de la requête non autorisée.",
    });
  }

  return next();
};

module.exports = {
  csrfOriginProtection,
};
