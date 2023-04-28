const express = require("express");
const {
  saveComment,
  editComment,
  deleteComment,
} = require("../controllers/commentController");
const { isLoggedInUser } = require("../middleware/isLoginUserMiddleware");
const { isCurrentUser } = require("../middleware/isCurrentUser");

const router = express.Router();

router.post("/api/save-comment", isLoggedInUser, saveComment);
router.patch("/api/edit-comment", isLoggedInUser, editComment);
router.delete(
  "/api/delete-comment",
  isLoggedInUser,
  isCurrentUser,
  deleteComment
);

module.exports = router;
