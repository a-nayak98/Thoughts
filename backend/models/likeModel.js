const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  liked: {
    type: Boolean,
    required: true,
  },
  post: {
    // type: mongoose.Schema.Types.ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
});

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
