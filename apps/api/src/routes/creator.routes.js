const express = require("express");

const {
  getByPseudo,
} = require("../controllers/creator.controller");

const router = express.Router();

router.get("/:pseudo", getByPseudo);

module.exports = router;