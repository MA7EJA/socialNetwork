const { Server } = require('socket.io')
const http = require('http')
const express = require('express')

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
}

const userSocketMap = {}

io.on('connection', (socket) => {

    const userId = socket.handshake.query.userId;

    if(userId != 'undefined') userSocketMap[userId] = socket.id;

    io.emit('getOnlineUser', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        delete userSocketMap[userId]
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    })

    socket.on("sendMessage", (message) => {
      const receiverSocketId = getRecieverSocketId(message.receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
      }
    });
})

module.exports = { io, server, app, getRecieverSocketId };