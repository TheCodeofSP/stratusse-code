const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/role.middleware");

const {
  getUsers,
  updateRole,
  updateBan,
  updateCreatorApproval,
  getDashboard,
  getActions,
  getUserActions,
  getUserById,
  getUserActivitySummaryController,
  getUserNotesController,
  getUserBooksController,
  getUserCommentsController,
  getUserLibraryCommentsController,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/dashboard", authMiddleware, requireAdmin, getDashboard);

router.get("/actions", authMiddleware, requireAdmin, getActions);

router.get("/users", authMiddleware, requireAdmin, getUsers);

router.get("/users/:id/actions", authMiddleware, requireAdmin, getUserActions);

router.get(
  "/users/:id/activity-summary",
  authMiddleware,
  requireAdmin,
  getUserActivitySummaryController,
);

router.get(
  "/users/:id/notes",
  authMiddleware,
  requireAdmin,
  getUserNotesController,
);

router.get(
  "/users/:id/library",
  authMiddleware,
  requireAdmin,
  getUserBooksController,
);

router.get(
  "/users/:id/comments",
  authMiddleware,
  requireAdmin,
  getUserCommentsController,
);

router.get(
  "/users/:id/library-comments",
  authMiddleware,
  requireAdmin,
  getUserLibraryCommentsController,
);

router.get("/users/:id", authMiddleware, requireAdmin, getUserById);

router.patch("/users/:id/role", authMiddleware, requireAdmin, updateRole);

router.patch("/users/:id/ban", authMiddleware, requireAdmin, updateBan);

router.patch(
  "/users/:id/approve-creator",
  authMiddleware,
  requireAdmin,
  updateCreatorApproval,
);

module.exports = router;
