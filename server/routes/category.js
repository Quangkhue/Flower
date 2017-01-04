var express = require('express');
var router = express.Router();
var CategoryCtrl = require('../controllers/category');
var auth = require('../authentication')

router.post('/', auth, CategoryCtrl.createCategory);
router.put('/:id', auth, CategoryCtrl.updateCategory);
router.delete('/:id', auth, CategoryCtrl.deleteCategory);
router.get('/', CategoryCtrl.getCategories);
router.get('/:id', CategoryCtrl.getCategoryById);

module.exports = router;
