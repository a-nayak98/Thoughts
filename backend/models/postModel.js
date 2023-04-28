const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const posts_Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 15,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
      required: false,
    },
  ],
  likeIds: {
    type: Array,
    required: false,
  },
});

const Post = mongoose.model("posts", posts_Schema);

module.exports = {
  Post,
};
