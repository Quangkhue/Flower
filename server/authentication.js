var express = require('express')
var router = express.Router()
var UserCtrl = require('./controllers/user')
var jwt = require('jsonwebtoken')

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authentication'];
  console.log(req.headers);
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'LocDepZaiHeHe', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

module.exports = router;
