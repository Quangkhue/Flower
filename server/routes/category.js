var express = require('express');
var router = express.Router();
var CategoryCtrl = require('../controllers/category');

router.post('/', CategoryCtrl.createCategory);
router.put('/:id', CategoryCtrl.updateCategory);
router.delete('/:id', CategoryCtrl.deleteCategory);
router.get('/', CategoryCtrl.getCategories);
router.get('/:id', CategoryCtrl.getCategoryById);

module.exports = router;
