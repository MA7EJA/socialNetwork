const express = require('express');
const router = express.Router()

const userRoutes = require('./userRoutes');
const authRoutes = require("./authRoutes");
const postRoutes = require('./postRoutes')

router.use('/user', userRoutes);
router.use("/auth", authRoutes);
router.use('/post', postRoutes)

module.exports = router