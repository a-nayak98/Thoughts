var mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(function (conn) {
    console.log("DataBase Connected on port no. 27017.");
  })
  .catch(function (err) {
    console.log(err.message);
  });
