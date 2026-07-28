const express = require("express");
const {
  register,
  login,
  me,
  verifyEmailController,
  resendVerificationEmailController,
  forgotPasswordController,
  resetPasswordController,
  logoutController,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const {
  authRateLimiter,
  emailRateLimiter,
} = require("../middlewares/rateLimit.middleware");
const {
  requireTurnstile,
} = require("../middlewares/turnstile.middleware");

const router = express.Router();

router.post("/register", authRateLimiter, requireTurnstile, register);
router.post("/login", authRateLimiter, login);
router.get("/me", authMiddleware, me);
router.get("/verify-email", verifyEmailController);
router.post("/logout", logoutController);
router.post(
  "/resend-verification-email",
  emailRateLimiter,
  requireTurnstile,
  resendVerificationEmailController,
);
router.post(
  "/forgot-password",
  emailRateLimiter,
  requireTurnstile,
  forgotPasswordController,
);
router.post("/reset-password", authRateLimiter, resetPasswordController);

module.exports = router;
