const { UserModel } = require("../models/userModel");
var createToken = require("../helpers/createToken");
var jwt = require("jsonwebtoken");
var secretKey = "bloggingWebsite@BabuNayak1997";

async function registerUser(req, res) {
  try {
    var userData = req.body;
    var docDb = await UserModel.findOne({ email: userData.email });
    if (docDb) {
      // login
      const id = docDb._id;
      let token = createToken(id, secretKey);
      var userNewData = await UserModel.findByIdAndUpdate(
        { _id: id },
        { token: token }
      );
      return res.status(200).json({ data: userNewData });
    } else {
      //register a new user
      const newUser = {
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
      };
      const document = await UserModel.create({ ...newUser });

      console.log(document);
      const token = createToken(document._id, secretKey);
      console.log(token);
      const result = await UserModel.findOneAndUpdate(
        { _id: document._id },
        { token },
        { new: true }
      );
      console.log(result);

      return res.status(201).json({ data: result });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msz: "Bad Request", err: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const token = req.headers.token;
    jwt.verify(token, secretKey, async (err, decoded) => {
      // console.log(err, decoded, "token");
      if (err) {
        console.log(err.message);
        return res.status(401).json({ msz: err.message });
      }
      // console.log(decoded);
      const id = decoded.data;
      const user = await UserModel.findOne({ _id: id });
      // console.log(user);
      return res.status(200).json({ data: user });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  registerUser,
  getUser,
};
