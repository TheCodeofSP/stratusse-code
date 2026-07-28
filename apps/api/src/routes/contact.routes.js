const express = require("express");

const { sendContact } = require("../controllers/contact.controller");
const {
  contactRateLimiter,
} = require("../middlewares/rateLimit.middleware");
const {
  requireTurnstile,
} = require("../middlewares/turnstile.middleware");

const router = express.Router();

router.post("/", contactRateLimiter, requireTurnstile, sendContact);

module.exports = router;
