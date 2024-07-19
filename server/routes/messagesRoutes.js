const express = require('express');
const isAuth = require('../middlewares/isAuth');
const {
  getAllChats,
  sendMessage,
  getAllMessages,
} = require("../controllers/messageControllers");

const router = express.Router();

router.get("/chats", isAuth, getAllChats);
router.post('/', isAuth, sendMessage )
router.get("/:id", isAuth, getAllMessages);

module.exports = router;