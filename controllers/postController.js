const Post = require('../models/post');
const Comment = require('../models/comment');

exports.post_list = async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true });
    res.json(posts);
  } catch (error) {
    res.json(error)
    next();
  }
};;
exports.post_list_all = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.post_detail = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const comments = await Comment.find({ post: post._id });
    res.json({post, comments});
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.post_create = async (req, res, next) => {
  const {title, text} = req.body;
  const post = new Post({
    title,
    text,
    author: ,
  });
  try {
    await post.save();
    res.status(201);
    res.send('Post created successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.post_update = async (req, res, next) => {
  const {title, text} = req.body;
  const post = new Post({
    title,
    text,
    author: ,
    _id: req.params.id
  });
  try {
    await Post.findByIdAndUpdate(req.params.id, post);
    res.status(201);
    res.send('Post updated successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.post_delete = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send('Post deleted Successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};