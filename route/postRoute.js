const express = require("express");
const router = express.Router();
const auth = require('../middleware/custmorAuth')
const {  createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById , viewfile } = require("../controller/postController");
const upload = require("../middleware/imageUpload");

router.post("/createpost", auth, upload.single('file'),  createPost);

router.post('/posts', auth, getAllPosts);

router.get('/posts/:postId', auth, getPostById);
router.get('/view/:filename',  viewfile);

router.put('/edit/:postId', auth, upload.single('file'), updatePostById);

router.delete('/delete/:postId', auth, deletePostById);


module.exports = router;
