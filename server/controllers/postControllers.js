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
})

module.exports = {newPost}