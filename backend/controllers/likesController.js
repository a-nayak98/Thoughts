const Like = require("../models/likeModel");

const addLike = async (req, res) => {
  try {
    const data = req.body;
    console.log(data, "!!!in controller");
    const like = {
      liked: data.liked,
      post: data.postId,
      user: data.userId,
    };
    const doc = await Like.create(like);
    if (doc) {
    //   console.log(doc);
      return res.status(201).json({ msz: "Like Added", data: doc });
    }
    // return res.status(200).json({ msz: "Like Added." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msz: "Bad Request", err: error.message });
  }
};

const removeLike = async (req, res) => {
  try {
    const postId = req.headers.postid;
    const userId = req.headers.userid;
    console.log(postId, userId);
    const doc = await Like.findOneAndDelete(
      { post: postId, user: userId },
      { new: true }
    );
    // console.log(doc);
    return res.status(200).json({ msz: "Like Deleted.", data: doc });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msz: "Bad Request" });
  }
};

module.exports = {
  addLike,
  removeLike,
};
