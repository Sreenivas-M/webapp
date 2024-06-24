const express = require("express");
const router = express.Router();
const auth = require('../middleware/custmorAuth')
const adminAuth = require('../middleware/adminAuth')
const { register, login, logout, refreshToken, getUserInfo, getAllUsers, getAllPosts } = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refreshToken", refreshToken);
router.get("/user",auth, getUserInfo);
router.post("/allUsers", auth, adminAuth, getAllUsers);
router.post("/allPosts", auth, adminAuth, getAllPosts);


module.exports = router;