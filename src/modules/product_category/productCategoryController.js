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

// Mongo Concept Api
exports.insetOne = async(req,res)=>{
    await productCategory.insertOne(req,res);
}
exports.insertMany = async(req,res)=>{
    await productCategory.insertMany(req,res);
}
exports.updateOne = async(req,res)=>{
    await productCategory.updateOne(req,res);
}
exports.find = async(req,res)=>{
    await productCategory.find(req,res);
}
exports.findOne = async(req,res)=>{
    await productCategory.findOne(req,res);
}
