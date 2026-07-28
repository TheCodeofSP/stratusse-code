const express = require("express");

const { getSitemap } = require("../controllers/sitemap.controller");

const router = express.Router();

router.get("/", getSitemap);

module.exports = router;
