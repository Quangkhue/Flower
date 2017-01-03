var mongoose = require('mongoose');
var Category = require('../models/category')
var APIResHandler = require('../routes/apiResponseHandler')

module.exports.getCategories = function(req, res, next){
    Category.find({isDeleted: {$ne: true}}).exec().then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    })
}

module.exports.getCategoryById = function(req, res, next){
    Category.findById(mongoose.Types.ObjectId(req.params.id)).exec().then(function(result){
        APIResHandler.successHandler(res, result);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    })
}

module.exports.createCategory = function(req, res, next){
    Category.create(req.body).then(function(c) {
        APIResHandler.successHandler(res, c);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.updateCategory = function(req, res, next){
    // delete req.body.id;
    Category.update({_id: req.params.id}, {$set: req.body}).then(function(cat){
        APIResHandler.successHandler(res, cat);
    }, function(error){
        APIResHandler.errorHandler(res, error);
    });
}

module.exports.deleteCategory = function(req, res, next){
    var id = req.params.id;
    Category.findById(mongoose.Types.ObjectId(id)).exec().then(function(cat){
        cat.isDeleted = true;
        cat.save().then(function(result){
            APIResHandler.successHandler(res, {ok: 1, nDeleted: 1});
        }, function(error){
            APIResHandler.errorHandler(res, error);
        })
    }, function(error){
        APIResHandler.errorHandler(res, error);
    })
}
