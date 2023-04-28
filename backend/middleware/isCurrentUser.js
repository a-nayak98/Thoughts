const Comment = require("../models/commentsModel");

const isCurrentUser = async (req, res, next) => {
  try {
    const currentUseId = req.userId;
    const commentId = req.headers.id;
    console.log(currentUseId);
    const data = await Comment.findById({ _id: commentId });
    console.log(data);
    const userId = data.user.toString();
    console.log(userId);

    if (currentUseId === userId) {
      next();
    } else {
      return res
        .status(400)
        .json({ msz: "You are not authorized to delete Post." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isCurrentUser,
};
