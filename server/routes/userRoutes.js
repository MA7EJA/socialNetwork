const express = require('express')
const isAuth = require('../middlewares/isAuth');
const { myProfile, userProfile } = require("../controllers/userControllers");

const router = express.Router();

router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, userProfile)

module.exports = router;