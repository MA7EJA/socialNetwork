const tryCatch = require('../utils/tryCatch')
const User = require('../models/userModel')

const myProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    res.json(user)
})

const userProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(!user) return res.status(404).json({ msg: "No User with this ID"});

    res.json(user)
})

module.exports = { myProfile, userProfile };