const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(403).json({ msg: "Unauthorized"});

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedData) return res.status(400).json({ msg: "Token Expired"});

        req.user = await User.findById(decodedData.id)

        next();
    } catch (error) {
        res.status(500).json({ msg: "Please Login"})
    }
}

module.exports = isAuth;