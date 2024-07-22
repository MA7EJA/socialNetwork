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
});


const commentOnPost = tryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if(!post) return res.status(404).json({ msg: "No Post with this ID"});

    post.comments.comment = req.body.comment;

    post.comments.push({ user: req.user._id, name: req.user.name, comment: req.body.comment, avatar: req.user.profilePicture.url});

    await post.save()

    res.json({ msg: "Comment Added"})
});

const deleteComment = tryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(!post) return res.status(404).json({ msg: "No post with this ID"});

    if(!req.query.commentId) return res.status(404).json({ msg: "No Comment with this ID"});

    const commentIndex = post.comments.findIndex((item) => item._id.toString() === req.query.commentId.toString());

    if(commentIndex === -1) return res.status(400).json({ msg: "Comment not Found"});

    const comment = post.comments[commentIndex]

    if(post.owner.toString() === req.user._id.toString() || comment.user.toString() === req.user._id.toString()){
        post.comments.splice(commentIndex, 1)

        await post.save()

        return res.json({ msg: "Comment Deleted"})
    }else{
        return res.status(400).json({ msg: "You are not allowed to delete this comment"})
    }
});

const editCaption = tryCatch(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "No post with this ID" });

    if(post.owner.toString() !== req.user._id.toString()) return res.status(403).json({ msg: "You are not owner of this Post"});

    post.caption = req.body.caption

    await post.save()

    res.json({ msg: "Post Updated"})
})

module.exports = {
  newPost,
  deletePost,
  getAllPosts,
  likeUnlikePost,
  commentOnPost,
  deleteComment,
  editCaption,
};