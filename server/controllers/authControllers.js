const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')

const getDataUrl = require('../utils/urlGenerator');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const file = req.file

        if(!name || !email || !password || !gender){
            return res.status(400).json({ msg: "Please fill all fields"})
        }

        let user = await User.findOne({ email })

        if(user) return res.status(400).json({ msg: "Email already exist"});

        const fileUrl = getDataUrl(file)

        const hashPassword = await bcrypt.hash(password, 10);

        const myCould = await cloudinary.v2.uploader.upload(fileUrl.content)

        user = await User.create({
          name,
          email,
          password: hashPassword,
          gender,
          profilePicture:{
            id: myCould.public_id,
            url: myCould.secure_url
          },
        });

        generateToken(user._id, res)
        
        res.status(201).json({
            msg: "User Registered ",
            user
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}