const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
  },
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
