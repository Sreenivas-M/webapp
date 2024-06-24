const Post = require("../model/postModel");

// Create a new post
const createPost = async (req, res) => {
    const userId = req.user.id;
  const  {title}  = req.body;

  try {
    const newPost = new Post({
      userId: userId,
      title: title
    });

    const savedPost = await newPost.save();
    res.status(201).json({msg:"created succesfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({userId});
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post by ID
const updatePostById = async (req, res) => {
  const { postId } = req.params;
  const { title } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, { title }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(201).json({msg:"Updated succesfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post by ID
const deletePostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(201).json({msg:"deleted succesfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
};
