const express = require('express');
const isAuth = require('../middlewares/isAuth');
const { sendMessage } = require('../controllers/messageControllers');

const router = express.Router();

router.post('/', isAuth, sendMessage )

module.exports = router;