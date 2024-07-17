const User = require('../models/userModel')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const file = req.file

        if(!name || !email || !password || !gender){
            return res.status(400).json({ msg: "Please fill all fields"})
        }

        let user = await User.findOne({ email })

        if(user) return res.status(400).json({ msg: "Email already exist"});

    } catch (error) {
        return res.status(500).json(error)
    }
}