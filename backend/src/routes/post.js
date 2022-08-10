const express = require("express");
const router = express.Router();
const PostController = require("../app/controllers/postController");
const fileUploader = require("../middleware/cloudinary.config");
// const upload = require("../middleware/upload");
router.post(
  "/create",
  fileUploader.single("images"),
  PostController.createPost
);
router.put("/comment", PostController.createComment);
router.get("/detail", PostController.getPostDetail);
router.get("/", PostController.getPost);

module.exports = router;
