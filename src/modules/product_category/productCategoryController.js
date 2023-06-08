const productCategory = require("./productCategoryService");

exports.getProductCategoryList = async (req, res) => {
    await productCategory.getProductCategoryList(req, res);
}

exports.createProductCategory = async (req,res) =>{
    await productCategory.createProductCategory(req, res);
}

exports.updateProductCategory = async (req,res) =>{
    await productCategory.updateProductCategory(req, res);
}

exports.getProductCategory = async (req,res) =>{
    await productCategory.getProductCategory(req, res);
}
