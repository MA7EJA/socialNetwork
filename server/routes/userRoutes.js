const express = require('express')
const isAuth = require('../middlewares/isAuth');
const myProfile = require('../controllers/userControllers');

const router = express.Router();

router.get("/me", isAuth, myProfile);

module.exports = router;