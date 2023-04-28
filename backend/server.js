var express = require("express");
var UserRoutes = require("./routes/userRoutes");
var PostRoutes = require("./routes/postRoutes");
var CommentRoutes = require("./routes/commentRoutes");
var LikeRoutes = require("./routes/likeRoutes");
var cors = require("cors");
// var dotenv = require("dotenv");
const path = require("path");
require("./db");
require("./helpers/uploadImage");
require("dotenv").config({ path: path.join(__dirname, "/.env") });

const port = process.env.PORT || 3000;

// dotenv.config();
var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(UserRoutes);
app.use(PostRoutes);
app.use(CommentRoutes);
app.use(LikeRoutes);

app.get("/", function (req, res) {
  res.status(200).send("Server Connected and giving response to Client");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
