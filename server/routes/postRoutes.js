const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {
  newPost,
  deletePost,
  getAllPosts,
  likeUnlikePost,
  commentOnPost,
} = require("../controllers/postControllers");
const uploadFile = require("../middlewares/multer");

const router = express.Router();

router.post('/new', isAuth, uploadFile ,newPost);
router.delete("/:id", isAuth, deletePost);
router.get("/all", isAuth, getAllPosts);
router.post("/like/:id", isAuth, likeUnlikePost);
router.post("/comment/:id", isAuth, commentOnPost);

module.exports = router