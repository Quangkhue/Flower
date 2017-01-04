var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/user');

router.post('/login', UserCtrl.login);


module.exports = router;
