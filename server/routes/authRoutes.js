const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers");
const uploadFile = require("../middlewares/multer");

const router = express.Router();

router.post("/register", uploadFile ,registerUser);
router.post("/login", loginUser)

module.exports = router;
