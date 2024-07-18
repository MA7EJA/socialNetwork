const express = require('express');
const router = express.Router()

const userRoutes = require('./userRoutes');
const authRoutes = require("./authRoutes");
const postRoutes = require('./postRoutes');
const messagesRoutes = require('./messagesRoutes')

router.use('/user', userRoutes);
router.use("/auth", authRoutes);
router.use('/post', postRoutes);
router.use("/message", messagesRoutes);

module.exports = router