var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController');


router.get('/', function(req, res) {
  if(req.user){
    res.redirect('/posts');
  } else {
    res.redirect('/log-in');
  }  
});

router.post("/sign-up", index_controller.signup_post);
//Post login page
router.post("/log-in", index_controller.login_post);
//Get logout
router.get("/log-out", index_controller.logout_get);

module.exports = router;
