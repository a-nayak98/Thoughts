var mongoose = require("mongoose");
var { Schema } = mongoose;

var user_Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: false,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
      required: false,
    },
  ],
  //   is_admin: {
  //     type: Boolean,
  //     required: true,
  //   },
  token: {
    type: String,
    required: false,
  },
});

var UserModel = mongoose.model("user", user_Schema);

module.exports = { UserModel };
