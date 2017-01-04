var express = require('express');
var router = express.Router();
var ProductCtrl = require('../controllers/product');
var auth = require('../authentication')

router.put('/:id', auth, ProductCtrl.updateProduct);
router.delete('/:id', auth, ProductCtrl.deleteProduct);
router.post('/', auth, ProductCtrl.createProduct);
router.post('/categories', ProductCtrl.getProductByCats);
router.get('/count', ProductCtrl.getCount);
router.get('/', ProductCtrl.getProducts);
router.get('/:id', ProductCtrl.getProductById);

module.exports = router;
