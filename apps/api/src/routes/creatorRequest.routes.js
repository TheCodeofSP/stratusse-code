const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const { requireAdmin } = require("../middlewares/role.middleware");

const {
  create,
  getPending,
  getHistory,
  getById,
  approve,
  reject,
  getMine,
} = require("../controllers/creatorRequest.controller");

const router = express.Router();

// utilisateur connecté
router.post("/", authMiddleware, create);

// admin
router.get("/admin", authMiddleware, requireAdmin, getPending);

router.get("/admin/history", authMiddleware, requireAdmin, getHistory);
router.get("/admin/:id", authMiddleware, requireAdmin, getById);

router.get("/me", authMiddleware, getMine);

router.patch("/:id/approve", authMiddleware, requireAdmin, approve);

router.patch("/:id/reject", authMiddleware, requireAdmin, reject);

module.exports = router;
