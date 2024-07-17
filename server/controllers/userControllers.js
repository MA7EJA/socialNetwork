const tryCatch = require('../utils/tryCatch')
const User = require('../models/userModel')

const myProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    res.json(user)
})

module.exports = myProfile;