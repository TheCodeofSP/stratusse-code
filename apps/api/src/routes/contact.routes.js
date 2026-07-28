const express = require("express");

const { sendContact } = require("../controllers/contact.controller");
const {
  contactRateLimiter,
} = require("../middlewares/rateLimit.middleware");

const router = express.Router();

router.post("/", contactRateLimiter, sendContact);

module.exports = router;
