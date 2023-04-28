const express = require("express");
const { addLike, removeLike } = require("../controllers/likesController");
const { isLoggedInUser } = require("../middleware/isLoginUserMiddleware");

const router = express.Router();

router.post("/api/liked", isLoggedInUser, addLike);

router.delete("/api/unLiked", isLoggedInUser, removeLike);

module.exports = router;
