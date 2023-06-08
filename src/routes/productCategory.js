const express = require('express');
const productController = require("../modules/product_category/productCategoryController");
const router = express.Router();


router.post('/getProductCategory', productController.getProductCategory);

router.get('/getProductCategoryList', productController.getProductCategoryList);

router.post('/createProductCategory', productController.createProductCategory);

router.post('/updateProductCategory', productController.updateProductCategory);

module.exports = router;