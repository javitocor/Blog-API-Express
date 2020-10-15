const Comment = require('../models/comment');

exports.comment_create = async (req, res, next) => {
  const {text} = req.body;
  const comment = new Comment({
    text,
    author: req.user,
    post: req.post_id,
  });
  try {
    await comment.save();
    res.status(201);
    res.send('Comment created successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};
exports.comment_delete = async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send('Comment deleted successfully');
  } catch (error) {
    res.json(error)
    next();
  }
};