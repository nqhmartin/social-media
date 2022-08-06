const express = require("express");
const router = express.Router();
const PostController = require("../app/controllers/postController");

router.post("/create", PostController.createPost);
router.put("/comment", PostController.createComment);
router.get("/detail", PostController.getPostDetail);
router.get("/", PostController.getPost);

module.exports = router;
