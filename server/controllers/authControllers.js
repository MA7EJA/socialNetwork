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

    const fileUrl = getDataUrl(file);

    const hashPassword = await bcrypt.hash(password, 10);

    const myCould = await cloudinary.v2.uploader.upload(fileUrl.content);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      profilePicture: {
        id: myCould.public_id,
        url: myCould.secure_url,
      },
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

module.exports = { registerUser, loginUser };