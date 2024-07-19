const express = require('express');
const isAuth = require('../middlewares/isAuth');
const {
  sendMessage,
  getAllMessages,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post('/', isAuth, sendMessage )
router.post("/:id", isAuth, getAllMessages);

module.exports = router;