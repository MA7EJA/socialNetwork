const Post = require("../models/postModel");
const tryCatch = require("../utils/tryCatch");
const getDataUrl = require("../utils/urlGenerator");
const cloudinary = require('cloudinary')

const newPost = tryCatch(async (req, res) => {
    const { caption } = req.body;

    const ownerId = req.user._id;
    
    const file = req.file;
    const fileUrl = getDataUrl(file)

    let option 

    const type = req.query.type

    if(type == 'reel'){
        option = {
            resource_type: "video"
        }
    }else{
        option = {}
    }

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content, option);

    const post = await Post.create({ caption, post: { id: myCloud.public_id, url: myCloud.secure_url }, owner: ownerId, type});

    res.status(201).json({ msg: "Post Created", post})
});

const deletePost = tryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if(!post) return res.status(404).json({ msg: 'No Post with this ID'});

    if(post.owner.toString() !== req.user._id.toString()) return res.status(403).json({ msg: "Unauthorized"});

    await cloudinary.v2.uploader.destroy(post.post.id);

    await post.deleteOne();

    res.json({ msg: "Post Deleted"})
});

const getAllPosts = tryCatch(async (req, res) => {
    const posts = await Post.find({ type: "post" })
      .sort({ createdAt: -1 })
      .populate("owner", "-password");

    const reels = await Post.find({ type: "reel" })
      .sort({ createdAt: -1 })
      .populate("owner", "-password");

    res.json({ posts, reels })
});

const likeUnlikePost = tryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if(!post) return res.status(404).json({
        msg: "No Post with this ID"
    })

    if(post.likes.includes(req.user._id)){
        const index = post.likes.indexOf(req.user._id)

        post.likes.splice(index, 1)

        await post.save()

        res.json({ msg: "Post Unlike" })
    }else{
        post.likes.push(req.user._id)

        await post.save();

        res.json({ msg: "Post Liked" });
    }
})

module.exports = { newPost, deletePost, getAllPosts, likeUnlikePost };