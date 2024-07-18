const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { newPost } = require("../controllers/postControllers");
const uploadFile = require("../middlewares/multer");

const router = express.Router();

router.post('/new', isAuth, uploadFile ,newPost);

module.exports = router