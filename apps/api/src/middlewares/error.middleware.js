const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    message: "Route introuvable.",
  });
};

const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "Origine non autorisée.",
    });
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  return res.status(500).json({
    message: "Erreur serveur.",
  });
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware,
};
