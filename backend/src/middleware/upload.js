const path = require("path");
const multer = require("multer");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, uuidv4() + ext);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
