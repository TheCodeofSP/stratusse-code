const RequestLimit = require("../models/RequestLimit");
const {
  getClientIp,
  hashRequestKey,
} = require("../utils/requestKey.utils");

const createRateLimiter = ({ name, windowMs, limit, message, includeUser }) => {
  return async (req, res, next) => {
    try {
      const now = new Date();
      const resetAt = new Date(now.getTime() + windowMs);
      const identity = includeUser && req.user?._id
        ? String(req.user._id)
        : getClientIp(req);
      const key = hashRequestKey(name, identity);

      const counter = await RequestLimit.findOneAndUpdate(
        { key },
        [
          {
            $set: {
              hits: {
                $cond: [
                  {
                    $or: [
                      { $eq: [{ $type: "$resetAt" }, "missing"] },
                      { $lte: ["$resetAt", now] },
                    ],
                  },
                  1,
                  { $add: [{ $ifNull: ["$hits", 0] }, 1] },
                ],
              },
              resetAt: {
                $cond: [
                  {
                    $or: [
                      { $eq: [{ $type: "$resetAt" }, "missing"] },
                      { $lte: ["$resetAt", now] },
                    ],
                  },
                  resetAt,
                  "$resetAt",
                ],
              },
              expiresAt: {
                $cond: [
                  {
                    $or: [
                      { $eq: [{ $type: "$resetAt" }, "missing"] },
                      { $lte: ["$resetAt", now] },
                    ],
                  },
                  resetAt,
                  "$resetAt",
                ],
              },
            },
          },
        ],
        {
          upsert: true,
          new: true,
        },
      );

      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((counter.resetAt.getTime() - now.getTime()) / 1000),
      );

      res.setHeader("RateLimit-Limit", String(limit));
      res.setHeader(
        "RateLimit-Remaining",
        String(Math.max(0, limit - counter.hits)),
      );
      res.setHeader("RateLimit-Reset", String(retryAfterSeconds));

      if (counter.hits > limit) {
        res.setHeader("Retry-After", String(retryAfterSeconds));

        return res.status(429).json({
          message,
        });
      }

      return next();
    } catch (error) {
      console.error(`Erreur rate limit (${name}) :`, error);

      return res.status(503).json({
        message:
          "La protection anti-abus est momentanément indisponible. Merci de réessayer.",
      });
    }
  };
};

const authRateLimiter = createRateLimiter({
  name: "auth",
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Trop de tentatives. Réessayez dans quelques minutes.",
});

const emailRateLimiter = createRateLimiter({
  name: "email",
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "Trop de demandes d’email. Réessayez plus tard.",
});

const contactRateLimiter = createRateLimiter({
  name: "contact",
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "Trop de messages envoyés. Réessayez plus tard.",
});

const interactionRateLimiter = createRateLimiter({
  name: "interaction",
  windowMs: 60 * 1000,
  limit: 30,
  message: "Trop d’interactions rapprochées. Prenez un instant avant de continuer.",
  includeUser: true,
});

const commentRateLimiter = createRateLimiter({
  name: "comment",
  windowMs: 10 * 60 * 1000,
  limit: 5,
  message: "Trop de réponses rapprochées. Prenez un instant avant de continuer.",
  includeUser: true,
});

const contentRateLimiter = createRateLimiter({
  name: "content",
  windowMs: 60 * 60 * 1000,
  limit: 10,
  message: "Trop de contenus enregistrés. Réessayez un peu plus tard.",
  includeUser: true,
});

const creatorRequestRateLimiter = createRateLimiter({
  name: "creator-request",
  windowMs: 24 * 60 * 60 * 1000,
  limit: 1,
  message: "Une seule demande peut être envoyée par jour.",
  includeUser: true,
});

module.exports = {
  authRateLimiter,
  commentRateLimiter,
  contactRateLimiter,
  contentRateLimiter,
  creatorRequestRateLimiter,
  emailRateLimiter,
  interactionRateLimiter,
};
