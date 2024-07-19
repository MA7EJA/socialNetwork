const express = require('express')
const isAuth = require('../middlewares/isAuth');
const {
  getAllUsers,
  myProfile,
  userProfile,
  followAndUnfollowUser,
  userFollowersAndFollowingData,
  updateProfile,
  updatePassword,
} = require("../controllers/userControllers");
const uploadFile = require('../middlewares/multer');

const router = express.Router();

router.get("/all", isAuth, getAllUsers);
router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.post("/:id", isAuth, updatePassword);
router.put("/:id", isAuth, uploadFile, updateProfile);
router.post("/follow/:id", isAuth, followAndUnfollowUser);
router.get("/follow/data/:id", isAuth, userFollowersAndFollowingData);

module.exports = router;