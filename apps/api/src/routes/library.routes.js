const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  requireCreatorOrAdmin,
} = require("../middlewares/role.middleware");
const {
  contentRateLimiter,
  interactionRateLimiter,
} = require("../middlewares/rateLimit.middleware");

const {
  create,
  getAll,
  getById,
  update,
  remove,
  like,
  unlike,
  getMine,
  getByIdPrivate,
} = require("../controllers/library.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  requireCreatorOrAdmin,
  contentRateLimiter,
  create,
);
router.get("/", getAll);

router.post("/:id/like", authMiddleware, interactionRateLimiter, like);
router.delete("/:id/like", authMiddleware, interactionRateLimiter, unlike);

router.patch(
  "/:id",
  authMiddleware,
  requireCreatorOrAdmin,
  contentRateLimiter,
  update,
);
router.delete("/:id", authMiddleware, requireCreatorOrAdmin, remove);

router.get("/me", authMiddleware, getMine);

router.get("/id/:id", authMiddleware, getByIdPrivate);

router.get("/:id", getById);

module.exports = router;
