const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  commentRateLimiter,
  interactionRateLimiter,
} = require("../middlewares/rateLimit.middleware");

const {
  create,
  getByBook,
  remove,
  like,
  unlike,
} = require("../controllers/libraryComment.controller");

const router = express.Router();

router.post(
  "/library/:bookId/comments",
  authMiddleware,
  commentRateLimiter,
  create,
);
router.get("/library/:bookId/comments", getByBook);
router.delete("/library-comments/:id", authMiddleware, remove);
router.post(
  "/library-comments/:id/like",
  authMiddleware,
  interactionRateLimiter,
  like,
);
router.delete(
  "/library-comments/:id/like",
  authMiddleware,
  interactionRateLimiter,
  unlike,
);

module.exports = router;
