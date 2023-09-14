const express = require('express');
const productController = require("../modules/product_category/productCategoryController");
const router = express.Router();


router.post('/getProductCategory', productController.getProductCategory);

router.get('/getProductCategoryList', productController.getProductCategoryList);

router.post('/createProductCategory', productController.createProductCategory);

router.post('/updateProductCategory', productController.updateProductCategory);

// Mongo Concept Api

router.post('/insertOne', productController.insetOne);
router.post('/insertMany', productController.insertMany);
router.post('/updateOne', productController.updateOne);
router.post('/find', productController.find);
router.post('/findOne', productController.findOne);
module.exports = router;