const tryCatch = require('../utils/tryCatch')
const User = require('../models/userModel');
const getDataUrl = require('../utils/urlGenerator');
const cloudinary = require('cloudinary')
const bcrypt = require('bcrypt')
const cron = require("node-cron");

const userIdToUpdate = "669d17e373852581be9ba3e4";

const generateNewName = () => {
  const names = ["John", "Jane", "Doe", "Alice", "Bob"];
  return names[Math.floor(Math.random() * names.length)];
};

const updateUserName = async (userIdToUpdate) => {
  try {
    const user = await User.findById(userIdToUpdate);
    if (user) {
      const newName = generateNewName();
      user.name = newName;
      await user.save();
      console.log(`Updated user ${user._id} name to ${newName}`);
    } else {
      console.log(`User with ID ${userIdToUpdate} not found`);
    }
  } catch (error) {
    console.error("Error updating user name:", error);
  }
};

cron.schedule("*/7 * * * *", () => {
  console.log("Running a task every 7 minutes");
  updateUserName(userIdToUpdate);
});

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
    const user = await User.findById(req.params.id).select('-password').populate('followers', '-password').populate("followings", "-password");

    const followers = user.followers;
    const followings = user.followings

    res.json({ followers, followings })
});

const updateProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id)

    const {name} = req.body;
    if(name){
        user.name = name
    }

    const file = req.file
    if(file){
        const fileUrl = getDataUrl(file)

        await cloudinary.v2.uploader.destroy(user.profilePicture.id);

        const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content)

        user.profilePicture.id = myCloud.public_id;
        user.profilePicture.url = myCloud.secure_url;
    }

    await user.save()

    res.json({ msg: "Profile Updated"})
});

const updatePassword = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id)

    const {oldPassword, newPassword} = req.body;
    
    const comparePassword = await bcrypt.compare(oldPassword, user.password)
    if(!comparePassword) return res.status(400).json({ msg: "Wrong Current Password"});

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save()

    res.json({ msg: "Password Updated"})
});

const getAllUsers = tryCatch(async (req, res) => {
    const search = req.query.search || "";
    const users = await User.find({ name: {$regex: search, $options: "i"}, id: { $ne: req.user._id }}).select('-password')

    res.json(users);
})

module.exports = {
  myProfile,
  userProfile,
  followAndUnfollowUser,
  userFollowersAndFollowingData,
  updateProfile,
  updatePassword,
  getAllUsers,
};