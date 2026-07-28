const { rateLimit } = require("express-rate-limit");

const createRateLimiter = ({ windowMs, limit, message }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message },
  });

const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Trop de tentatives. Réessayez dans quelques minutes.",
});

const emailRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "Trop de demandes d’email. Réessayez plus tard.",
});

const contactRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "Trop de messages envoyés. Réessayez plus tard.",
});

module.exports = {
  authRateLimiter,
  emailRateLimiter,
  contactRateLimiter,
};
