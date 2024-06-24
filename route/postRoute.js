const express = require("express");
const router = express.Router();
const auth = require('../middleware/custmorAuth')
const {  createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById  } = require("../controller/postController");

router.post("/createpost", auth, createPost);

router.post('/posts', auth, getAllPosts);

router.get('/posts/:postId', auth, getPostById);

router.put('/edit/:postId', auth, updatePostById);

router.delete('/delete/:postId', auth, deletePostById);


module.exports = router;