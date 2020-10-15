var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

router.get('/', post_controller.post_list);
router.get('/:id', post_controller.post_detail);
router.post('/', post_controller.post_create);
router.update('/:id', post_controller.post_update);
router.delete('/:id', post_controller.post_delete);

module.exports = router;