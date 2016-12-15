var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product.js');
/* GET /todos listing. */
router.get('/', function(req, res, next) {
    var query = req.param('query')
    Product.find(function(err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

router.post('/', function(req, res, next) {
    Product.create(req.body.data, function(err, p) {
        if (err) return next(err);
        res.json(p);
    });
});

router.put('/', function(req, res, next){
    var data = req.body.data;
    // Product.findById(data._id, function(err, p){
    //     if(err) return next(err);
    //     if(!p){
    //         return res.json("Not found!");
    //     }
    //     p.name = data.name;
    //     p.catIds = data.catIds;
    //
    //     p.save(function(err, updatedProduct){
    //         if(err) return next(err);
    //         res.json(updatedProduct);
    //     })
    // })
    Product.update({_id: data._id}, {$set: data}, function(err, p){
        if(err) return next(err);
        res.json(p);
    })
});

module.exports = router;
