const bufferToString = require("../helpers/bufferToString");
const cloudinary = require("../helpers/cloudinary");
var { Post } = require("../models/postModel");
const { UserModel } = require("../models/userModel");
// const fs = require('fs');

const createImageUrl = async (req, res) => {
  try {
    const imagData = req.file;
    // console.log(imagData);
    const { originalname, buffer } = imagData;
    console.log(originalname, buffer);
    const imageContent = bufferToString(originalname, buffer);
    const { secure_url } = await cloudinary.uploader.upload(imageContent);
    console.log(secure_url);

    return res.status(200).json({ data: secure_url });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const payload = {
      title: req.body.title,
      description: req.body.desc,
      image: req.body.image,
      user: req.userId,
      createdAt: new Date(),
    };

    let document = await Post.create(payload);

    if (!document) return res.status(500).send("Post Can not be Created.");
    else {
      console.log(document);
      const doc = await UserModel.findByIdAndUpdate();
      return res
        .status(200)
        .json({ msz: "Post Created Successfully.", data: document });
    }
  } catch (err) {
    console.log(err, "error");
    return res.status(500).send(err.message);
  }
};

const getAllPosts = async (req, res) => {
  try {
    // i am getting data on sorted manner ,like recently created to first created
    const data = await Post.find({}).sort({ createdAt: -1 }).populate("user");
    // console.log(data);
    return res
      .status(200)
      .json({ data: data, message: "Data Received from server." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

const singleUserAllPosts = async (req, res) => {
  try {
    const id = req.params.userId;
    // console.log(id);
    const data = await Post.find({ user: id });
    // console.log(data);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msz: error.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log(postId);
    const data = await Post.findById(postId)
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    // console.log(data);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await Post.findByIdAndDelete({ _id: id });
    return res
      .status(204)
      .json({ msz: "Post Deleted Successfully.", data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ err: error.message });
  }
};

const editPost = async (req, res) => {
  try {
    // const payload = req.body;
    const payload = {
      title: req.body.title,
      description: req.body.desc,
      image: req.body.image,
      postId: req.body.postId,
    };
    console.log(payload);
    const id = payload.postId;
    const data = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title: payload.title,
        description: payload.description,
        image: payload.image,
      },
      { new: true }
    );
    console.log(data);
    return res.status(202).json({ data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  singleUserAllPosts,
  getSinglePost,
  deletePost,
  editPost,
  createImageUrl,
};
