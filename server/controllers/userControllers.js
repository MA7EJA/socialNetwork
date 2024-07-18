const tryCatch = require('../utils/tryCatch')
const User = require('../models/userModel')

const myProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

    res.json(user)
});

const userProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(!user) return res.status(404).json({ msg: "No User with this ID"});

    res.json(user)
});

const followAndUnfollowUser = tryCatch(async (req, res) => {
    const user = await User.findById(req.params.id)
    const loggedInUser = await User.findById(req.user._id)

    if(!user) return res.status(404).json({ msg: 'No User with this ID'});

    if(user._id.toString() === loggedInUser._id.toString()) return res.status(400).json({ msg: "You can't Follow yourself"});

    if(user.followers.includes(loggedInUser._id)){
        const indexFollowing = loggedInUser.followings.indexOf(user._id);
        const indexFollowers = user.followers.indexOf(loggedInUser._id);

        loggedInUser.followings.splice(indexFollowing, 1)
        user.followers.splice(indexFollowers, 1)

        await loggedInUser.save()
        await user.save()

        res.json({ msg: 'User Unfollowed'})
    }else{
        loggedInUser.followings.push(user._id)
        user.followers.push(loggedInUser._id)

        await loggedInUser.save();
        await user.save();

        res.json({ msg: "User Followed"})
    }
});

const userFollowersAndFollowingData = tryCatch(async (req, res) => {
    const user = await User.findById(req.params._id).select('-password').populate('followers', '-password').populate("followings", "-password");

    const followers = user.followers;
    const followings = user.followings

    res.json({ followers, followings })
});

module.exports = {
  myProfile,
  userProfile,
  followAndUnfollowUser,
  userFollowersAndFollowingData,
};