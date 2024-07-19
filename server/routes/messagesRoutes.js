const express = require('express');
const isAuth = require('../middlewares/isAuth');
const {
  sendMessage,
  getAllMessages,
  getAllChats,
} = require("../controllers/messageControllers");

const router = express.Router();

router.post('/', isAuth, sendMessage )
router.get("/:id", isAuth, getAllMessages);
router.get("/chats", isAuth, getAllChats);

module.exports = router;