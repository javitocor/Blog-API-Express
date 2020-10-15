var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController');


router.get('/', function(req, res) {
  res.redirect('/posts');
});

module.exports = router;
