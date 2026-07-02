const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Utilisateur non authentifié.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Accès interdit.",
      });
    }

    next();
  };
};

const requireAdmin = requireRole("admin");

const requireCreatorOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Utilisateur non authentifié.",
    });
  }

  const isCreator = req.user.role === "creator" && req.user.isApprovedCreator;
  const isAdmin = req.user.role === "admin";

  if (!isCreator && !isAdmin) {
    return res.status(403).json({
      message: "Accès réservé aux créateurs approuvés ou administrateurs.",
    });
  }

  next();
};

module.exports = {
  requireRole,
  requireAdmin,
  requireCreatorOrAdmin,
};