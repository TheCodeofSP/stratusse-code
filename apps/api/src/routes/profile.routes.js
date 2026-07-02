const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  getMe,
  getStats,
  updatePassword,
  deleteAccount,
} = require("../controllers/profile.controller");

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/stats", authMiddleware, getStats);

router.patch("/password", authMiddleware, updatePassword);
router.delete("/me", authMiddleware, deleteAccount);

module.exports = router;