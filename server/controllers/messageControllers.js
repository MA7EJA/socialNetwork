const Chat = require("../models/chatModel");
const Messages = require("../models/messagesModel");
const { getRecieverSocketId, io } = require("../socket/socket");
const tryCatch = require("../utils/tryCatch");

const sendMessage = tryCatch(async (req, res) => {
  const { recieverId, message } = req.body;

  const senderId = req.user._id;

  if (!recieverId)
    return res.status(400).json({ msg: "Please Give reciver Id" });

  let chat = await Chat.findOne({
    users: { $all: [senderId, recieverId] },
  }).exec();

  if (!chat) {
    chat = new Chat({
      users: [senderId, recieverId],
      latestMessage: { text: message, sender: senderId },
    });

    await chat.save();
  }

  const newMessage = new Messages({
    chatId: chat._id,
    sender: senderId,
    text: message,
  });

  await newMessage.save();

  await chat.updateOne({ latestMessage: { text: message, sender: senderId } });

  const recieverSocketId = getRecieverSocketId(recieverId)

  if(recieverSocketId){
    io.to(recieverSocketId).emit('newMessage', newMessage)
  }

  res.status(201).json(newMessage);
});

const getAllMessages = tryCatch(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const chat = await Chat.findOne({ users: { $all: [userId, id] } });

  if (!chat) return res.status(404).json({ msg: "No chat with this user" });

  const messages = await Messages.find({ chatId: chat._id }).populate({
    path: "sender",
    select: "name profilePicture _id",
  });;

  res.json(messages);
});

const getAllChats = tryCatch(async (req, res) => {
  const chats = await Chat.find({ users: req.user._id }).populate({
    path: "users",
    select: "name profilePicture",
  });

  chats.forEach((chat) => {
    chat.users = chat.users.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );
  });

  res.json(chats);
});

module.exports = { sendMessage, getAllMessages, getAllChats };
