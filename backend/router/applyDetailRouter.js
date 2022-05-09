const express = require("express");
const {
  ApplyDetailPost,
  readDetail,
  ApplyDetailRead,
} = require("../controllers/applyDetailController");
const { auth } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/applyDetail", auth, ApplyDetailPost);
router.get("/applyDetail/student/:id", auth, ApplyDetailRead);
router.get("/applyDetail/:id", auth, readDetail);

module.exports = router;
