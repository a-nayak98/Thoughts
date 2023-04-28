const express = require("express");
const {
  createPost,
  getAllPosts,
  singleUserAllPosts,
  getSinglePost,
  deletePost,
  editPost,
  createImageUrl,
} = require("../controllers/postControllers");
const { isLoggedInUser } = require("../middleware/isLoginUserMiddleware");
const upload = require("../helpers/uploadImage");

const router = express.Router();

router.post("/api/upload-image", upload.single("image"), createImageUrl);

router.post("/api/posts", isLoggedInUser, createPost);

router.get("/api/posts-all", getAllPosts);

router.get("/api/single-post/:postId", getSinglePost);

router.get("/api/current-user-post/:userId", singleUserAllPosts);

router.delete("/api/delete-post/:id", deletePost);

router.patch("/api/edit-post", editPost);

module.exports = router;
