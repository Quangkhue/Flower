var mongoose = require('mongoose');
var Product = require('../models/product');
var APIResHandler = require('../routes/apiResponseHandler');

var PAGING_CFG = {
    itemsPerPage: 6
}

module.exports.getProducts = function(req, res, next){
    var page = req.query.page || 1;
    var offset = (page - 1) * PAGING_CFG.itemsPerPage;
    var opts = {sort: {updatedAt: -1}, skip: offset, limit: PAGING_CFG.itemsPerPage};
    Product.find({isDeleted: {$ne: true}}, {}, opts).populate('cats').exec().then(function(result) {
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.getProductById = function(req, res, next){
    var id = mongoose.Types.ObjectId(req.params.id);
    Product.findOne({_id: id}).exec().then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.createProduct = function(req, res, next){
    Product.create(req.body).then(function(c) {
        APIResHandler.successHandler(res, c);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.updateProduct = function(req, res, next){
    Product.update({_id: req.params.id}, {$set: req.body}).then(function(cat){
        APIResHandler.successHandler(res, cat);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.deleteProduct = function(req, res, next){
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
    });
}

module.exports.getProductByCats = function(req, res, next){
    Product.getProductsByCatIds(req.body.catIds.map(function(id){
        return mongoose.Types.ObjectId(id);
    })).then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.getCount = function(req, res, next){
    Product.count().exec().then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}
