const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const Event = require("../models/eventModel");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../uploads/imgs/");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/api/upload", upload.single("image"), (req, res) => {
  res.send(`${req.file.path}`);
});

module.exports = router;
