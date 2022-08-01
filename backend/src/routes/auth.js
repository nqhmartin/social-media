const express = require("express");
const router = express.Router();
const { createUser, SignIn } = require("../app/controllers/authController.js");

router.post("/signup", createUser);
router.post("/signin", SignIn);
module.exports = router;
