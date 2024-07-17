const express = require("express");
const { registerUser } = require("../controllers/authControllers");
const uploadFile = require("../middlewares/multer");

const router = express.Router();

router.post("/register", uploadFile ,registerUser);

module.exports = router;
