const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const getDataUrl = require('../utils/urlGenerator');

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

        
    } catch (error) {
        return res.status(500).json(error)
    }
}