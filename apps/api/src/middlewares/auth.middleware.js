const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token manquant.",
      });
    }

    const token = authHeader.split(" ")[1];

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
