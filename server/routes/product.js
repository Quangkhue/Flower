var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var Product = require('../models/product');
var ProductCtrl = require('../controllers/product');

router.put('/:id', ProductCtrl.updateProduct);
router.delete('/:id', ProductCtrl.deleteProduct);
router.post('/', ProductCtrl.createProduct);
router.post('/categories', ProductCtrl.getProductByCats);
router.get('/', ProductCtrl.getProducts);
router.get('/:id', ProductCtrl.getProductById);

module.exports = router;
