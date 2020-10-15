var express = require('express');
var router = express.Router();

var comment_controller = require('../controllers/commentController');

router.post('/', comment_controller.comment_create);
router.delete('/:id', comment_controller.comment_delete);

module.exports = router;