var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product');
var APIResHandler = require('./apiResponseHandler')
/* GET /todos listing. */
router.get('/', function(req, res, next) {
    var query = req.param('query')
    Product.find({isDeleted: {$ne: true}}).populate('cats').exec().then(function(result) {
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
});

router.post('/categories', function(req, res, next){
    Product.getProductsByCatIds(req.body.catIds).then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
})

router.get('/:id', function(req, res, next){
    var id = mongoose.Types.ObjectId(req.params.id);
    Product.findOne({_id: id}).exec().then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    })
})

router.post('/', function(req, res, next){
    Product.create(req.body).then(function(c) {
        APIResHandler.successHandler(res, c);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
})

router.put('/:id', function(req, res, next){
    // delete req.body.id;
    Product.update({_id: req.params.id}, {$set: req.body}).then(function(cat){
        APIResHandler.successHandler(res, cat);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
})

router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    Product.findById(id).exec().then(function(p){
        p.isDeleted = true;
        p.save().then(function(result){
            APIResHandler.successHandler(res, {ok: 1, nDeleted: 1});
        }, function(error){
            APIResHandler.errorHandler(res, error);
        })
    }, function(error){
        APIResHandler.errorHandler(res, error);
    })
})

module.exports = router;
