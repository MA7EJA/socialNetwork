const Chat = require("../models/chatModel");
const Messages = require("../models/messagesModel");
const tryCatch = require("../utils/tryCatch");

const sendMessage = tryCatch(async (req, res) => {
    const { recieverId, message } = req.body

    const senderId = req.user._id;

    let chat = Chat.findOne({ users: { $all:[senderId, recieverId]}});

    if(!chat){
        chat = new Chat({ users: [senderId, recieverId], latestMessage: { text: message, sender: senderId}});

        await chat.save();
    }

    const newMessage = new Messages({ chatId: chat._id, senderId: senderId, text: message});

    await newMessage.save()

    await chat.updateOne({ latestMessage: { text: message, sender: senderId}});

    res.status(201).json(newMessage)
});

module.exports = { sendMessage }