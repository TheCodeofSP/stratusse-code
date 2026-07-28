const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  commentRateLimiter,
  interactionRateLimiter,
} = require("../middlewares/rateLimit.middleware");
const {
  create,
  getByNote,
  remove,
  like,
  unlike,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post(
  "/notes/:noteId/comments",
  authMiddleware,
  commentRateLimiter,
  create,
);
router.get("/notes/:noteId/comments", getByNote);
router.delete("/comments/:id", authMiddleware, remove);
router.post(
  "/comments/:id/like",
  authMiddleware,
  interactionRateLimiter,
  like,
);
router.delete(
  "/comments/:id/like",
  authMiddleware,
  interactionRateLimiter,
  unlike,
);

module.exports = router;
