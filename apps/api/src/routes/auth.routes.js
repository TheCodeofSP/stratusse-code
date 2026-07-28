const express = require("express");
const {
  register,
  login,
  me,
  verifyEmailController,
  resendVerificationEmailController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const {
  authRateLimiter,
  emailRateLimiter,
} = require("../middlewares/rateLimit.middleware");

const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.get("/me", authMiddleware, me);
router.get("/verify-email", verifyEmailController);
router.post(
  "/resend-verification-email",
  emailRateLimiter,
  resendVerificationEmailController,
);
router.post("/forgot-password", emailRateLimiter, forgotPasswordController);
router.post("/reset-password", authRateLimiter, resetPasswordController);

module.exports = router;
