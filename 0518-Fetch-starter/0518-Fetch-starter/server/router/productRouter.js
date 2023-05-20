var express = require('express');
const productController = require('../controller/productController');
var router = express.Router();


router.get('/:id', productController.getById);
router.post('/', productController.save);
router.get('/', productController.getAll);
router.delete('/:id', productController.deleteById);
router.put('/', productController.edit);

module.exports = router; 