var jwt = require("jsonwebtoken");
// Secret key for Token
var secretKey = "bloggingWebsite@BabuNayak1997";

const isLoggedInUser = (req, res, next) => {
  let token = req.headers.token;
  console.log(token, "!!!token inside middleware");
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({ msz: "Bad Request", err: err.message });
    } else if (decoded) {
      let userId = decoded.data;
      // assigning a key to request object we can send variables to the controller function using next().
      req.userId = userId;
      next();
    } else
      return res
        .status(400)
        .send("You are not LogeIn Kindly Logged In to Post any thing");
  });
};

module.exports = { isLoggedInUser };
