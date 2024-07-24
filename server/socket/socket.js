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

const userSocketMap = {}

io.on('connection', (socket) => {
    console.log('User Connected', socket.id)

    const userId = socket.handshake.query.userId;

    if(userId != 'undefined') userSocketMap[userId] = socket.id;

    io.emit('getOnlineUser', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        console.log('User Disconnected');
        delete userSocketMap[userId]
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    })
})

module.exports = {io, server, app}