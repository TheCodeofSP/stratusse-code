const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  create,
  getAll,
  getById,
  update,
  remove,
  like,
  unlike,
  getMine,
  getByIdPrivate,
} = require("../controllers/library.controller");

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/", getAll);

router.post("/:id/like", authMiddleware, like);
router.delete("/:id/like", authMiddleware, unlike);

router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

router.get("/me", authMiddleware, getMine);

router.get("/id/:id", authMiddleware, getByIdPrivate);

router.get("/:id", getById);

module.exports = router;
