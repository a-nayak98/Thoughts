var express = require("express");
var { registerUser,getUser } = require("../controllers/userControllers");
// var createToken = require("../healpers/createToken");

var router = express.Router();

router.post("/api/user", registerUser);
router.get('/api/get-user',getUser)

module.exports = router;
