const Auth = require("../model/authModel");
const Post = require('../model/postModel');
const bcrypt = require("bcryptjs");
const { createAccToken, createRefToken } = require("../middleware/token");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const passHash = await bcrypt.hash(password, 10);

    const newUser = await Auth({
      name,
      email,
      phone,
      password: passHash,
      role
    });
    await newUser.save();

    res.status(200).json({ msg: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const extUser = await Auth.findOne({ email });
    if (!extUser) return res.status(400).json({ msg: "user doesn't exists." });

    const isMatch = await bcrypt.compare(password, extUser.password);
    if (!isMatch)
      return res.status(400).json({ msg: "password doesn't match " });

    const accessToken = createAccToken({ id: extUser._id });
    const refreshToken = createRefToken({ id: extUser._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      signed: true,
      path: `/v1/auth/refreshToken`,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: 'None',
      secure: true ,
      sameSite: 'None',
    })   

    res.json({ accessToken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

 const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { path: `/v1/auth/refreshToken` });
    return res.status(200).json({ msg: "Successfully Logout" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

 const refreshToken = async (req, res) => {
  try {
    const ref = req.signedCookies.refreshToken;
    if (!ref)
      return res.status(400).json({ msg: "Session Expired.. Login Again.." });

    jwt.verify(ref, process.env.REF_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ msg: "Invalid Auth..Login Again.." });
      const accessToken = createAccToken({ id: user.id });
      res.json({ accessToken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const data = await Auth.findById({ _id: req.user.id }).select("-password");
    res.json({ user: data });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await Auth.find().select("-password");

    const filterUsers = data.filter((item) => item.role !== "admin");
    return res.status(200).json({
      users: filterUsers,
      length: filterUsers.length,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name email');

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { register, login, logout, refreshToken, getUserInfo, getAllUsers, getAllPosts };
