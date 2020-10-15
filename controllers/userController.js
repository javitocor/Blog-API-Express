const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.user_list = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.user_detail = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ author_id: user._id });
    const comments = await Comment.find({ author_id: user._id });
    res.json({user, posts, comments});
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.user_update = async (req, res, next) => {
  const {username, password} = req.body;
  const user = new User({
    username,
    password,
    _id: req.params.id
  });
  try {
    await User.findByIdAndUpdate(req.params.id, user);
    res.status(201);
    res.send('User updated successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.user_delete = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send('User deleted Successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};