const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/role.middleware");

const {
  getNotes,
  getLibrary,
  getComments,
  getLibraryComments,
  removeNote,
  removeBook,
  removeComment,
  removeLibraryComment,
  moderate,
  getNoteById,
  getLibraryById,
} = require("../controllers/adminContent.controller");

const router = express.Router();

router.get("/notes", authMiddleware, requireAdmin, getNotes);
router.get("/notes/:id", authMiddleware, requireAdmin, getNoteById);

router.get("/library", authMiddleware, requireAdmin, getLibrary);
router.get("/library/:id", authMiddleware, requireAdmin, getLibraryById);

router.get("/comments", authMiddleware, requireAdmin, getComments);
router.get(
  "/library-comments",
  authMiddleware,
  requireAdmin,
  getLibraryComments,
);

router.delete("/notes/:id", authMiddleware, requireAdmin, removeNote);
router.delete("/library/:id", authMiddleware, requireAdmin, removeBook);
router.delete("/comments/:id", authMiddleware, requireAdmin, removeComment);
router.delete(
  "/library-comments/:id",
  authMiddleware,
  requireAdmin,
  removeLibraryComment,
);

router.patch(
  "/notes/:id/moderate",
  authMiddleware,
  requireAdmin,
  moderate("note"),
);

router.patch(
  "/library/:id/moderate",
  authMiddleware,
  requireAdmin,
  moderate("book"),
);

router.patch(
  "/comments/:id/moderate",
  authMiddleware,
  requireAdmin,
  moderate("comment"),
);

router.patch(
  "/library-comments/:id/moderate",
  authMiddleware,
  requireAdmin,
  moderate("libraryComment"),
);

module.exports = router;
