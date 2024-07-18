const express = require('express')
const isAuth = require('../middlewares/isAuth');
const {
  myProfile,
  userProfile,
  followAndUnfollowUser,
  userFollowersAndFollowingData,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile);
router.post("/follow/:id", isAuth, followAndUnfollowUser);
router.get("./follow/data/:id", isAuth, userFollowersAndFollowingData);

module.exports = router;