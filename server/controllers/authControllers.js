const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const cloudinary = require('../config/cloudinary')

const getDataUrl = require('../utils/urlGenerator');
const generateToken = require('../utils/generateToken');
const tryCatch = require('../utils/tryCatch')

const registerUser = tryCatch(async (req, res) => {
    const { name, email, password, gender } = req.body;
    const file = req.file;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "Email already exist" });
    
    const hashPassword = await bcrypt.hash(password, 10);

    let profilePicture = null;
    if (file) {
      const fileUrl = getDataUrl(file);
      const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);
      profilePicture = {
        id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      profilePicture = {
        id: null,
        url: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x512-0mhn1054.png",
      };
    }

    user = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      profilePicture,
    });

    generateToken(user._id, res);

    res.status(201).json({
      msg: "User Registered ",
      user,
    });
})

const loginUser = tryCatch(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email});

    if(!user) return res.status(404).json({ msg: 'User not exist'});

    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) return res.status(400).json({ msg: "Invalid Password"});

    generateToken(user._id, res)

    res.json({ msg: "User Logged In", user})
})

const logoutUser = tryCatch(async (req, res) => {
    res.cookie('token', '',{maxAge: 0})

    res.json({ msg: "Logged out Successfully"})
})

module.exports = { registerUser, loginUser, logoutUser };