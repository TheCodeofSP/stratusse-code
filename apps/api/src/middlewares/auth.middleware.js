const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AUTH_COOKIE_NAME } = require("../utils/authCookie.utils");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    const token = req.cookies?.[AUTH_COOKIE_NAME] || bearerToken;

    if (!token) {
      return res.status(401).json({
        message: "Token manquant.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .select("-passwordHash")
      .populate("creatorApproval.approvedBy", "pseudo role");

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur introuvable.",
      });
    }

    if (user.isBanned) {
      return res.status(403).json({
        message: "Compte banni.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token invalide.",
    });
  }
};

module.exports = authMiddleware;
