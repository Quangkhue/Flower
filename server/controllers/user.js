var mongoose = require('mongoose');
var User = require('../models/user');
var APIResHandler = require('../routes/apiResponseHandler');
var jwt = require('jsonwebtoken')

module.exports.login = function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }).exec().then(function(u){
        if(!u){
            APIResHandler.errorHandler(res, new Error('Not found!'));
            return;
        }

        if(u.password != password){
            APIResHandler.errorHandler(res, new Error('Authentication failed!'));
            return;
        }

        var token = jwt.sign(u, 'LocDepZaiHeHe', {
          expiresIn: 1440 // expires in 24 hours
        });
        u.password = null;
        APIResHandler.successHandler(res, {
            user: u,
            token: token
        });
    }, function(error){
        APIResHandler.errorHandler(res, error);
    })
}
