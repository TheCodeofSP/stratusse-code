const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  create,
  getByNote,
  remove,
  like,
  unlike,
} = require("../controllers/comment.controller");
const router = express.Router();

router.post("/notes/:noteId/comments", authMiddleware, create);
router.get("/notes/:noteId/comments", getByNote);
router.delete("/comments/:id", authMiddleware, remove);
router.post("/comments/:id/like", authMiddleware, like);
router.delete("/comments/:id/like", authMiddleware, unlike);

module.exports = router;
