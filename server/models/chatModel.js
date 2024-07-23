const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  latestMessage: {
    text: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
},{
    timestamps: true
}
);

module.exports = mongoose.model('Chat', chatSchema)