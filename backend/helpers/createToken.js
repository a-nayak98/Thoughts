var jwt = require("jsonwebtoken");

// secretKey for token creation
// var secretKey = "bloggingWebsite@BabuNayak1997";

function createToken(id, secretKey) {
  var token = jwt.sign(
    {
      data: id,
    },
    secretKey,
    { expiresIn: 60 * 60 * 1 }
  );
  return token;
}

module.exports = createToken;
