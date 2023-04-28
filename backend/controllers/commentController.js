const Comment = require("../models/commentsModel");
const { Post } = require("../models/postModel");

const saveComment = async (req, res) => {
  try {
    const commentData = req.body;
    // console.log(commentData);
    const newData = {
      body: commentData.body,
      post: commentData.postId,
      user: commentData.userId,
      createdAt: commentData.createdAt,
    };
    const postId = commentData.postId;
    // const userId = commentData.userId;
    const data = await Comment.create(newData);
    // console.log(data);

    // adding user by populate
    const commentId = data._id;
    const doc = await Comment.findById({ _id: commentId }).populate("user");
    console.log(doc, "user ta aila");

    // saving comment data in the post model
    const document = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: data } }
    );
    console.log(document);
    return res.status(201).json({ data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msz: "Server Error", err: error.message });
  }
};

const editComment = async (req, res) => {
  try {
    const data = req.body;
    console.log(data, "data in controller");
    const id = data.id;

    // const document = await Comment.findByIdAndUpdate(
    //   { _id: id },
    //   { body: data.body }
    // );
    // console.log(document);
    // return res.status(200).json({ data: document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msz: "Server Error", err: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.headers.id;
    const postId = req.headers.postid;

    console.log(commentId, postId, "!!controller");
    const document = await Comment.findByIdAndDelete(
      { _id: commentId },
      { new: true }
    );
    console.log(document);

    // removing comment id from post model i use findByIdAndUpdate but don't work

    const doc = await Post.updateOne(
      { _id: postId },
      { $pull: { comments: commentId } },
      { new: true }
    );
    console.log(doc);

    return res
      .status(200)
      .json({ msz: "Delete Deleted Successfully", data: document });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msz: "Server Error", err: error.message });
  }
};

module.exports = {
  saveComment,
  editComment,
  deleteComment,
};
