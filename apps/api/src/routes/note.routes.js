const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { requireCreatorOrAdmin } = require("../middlewares/role.middleware");
const {
  create,
  getAll,
  getBySlug,
  update,
  remove,
  getAdminNotes,
  like,
  unlike,
  getMine,
  getById,
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/", getAll);
router.get("/admin/all", authMiddleware, requireCreatorOrAdmin, getAdminNotes);
router.post("/:id/like", authMiddleware, like);
router.delete("/:id/like", authMiddleware, unlike);
router.get("/me", authMiddleware, getMine);
router.get("/id/:id", authMiddleware, getById);
router.get("/:slug", getBySlug);
router.patch("/:id", authMiddleware, requireCreatorOrAdmin, update);
router.post("/", authMiddleware, requireCreatorOrAdmin, create);
router.delete("/:id", authMiddleware, requireCreatorOrAdmin, remove);

module.exports = router;
