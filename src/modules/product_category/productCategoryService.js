const dbData = require("./../../config/dbConfig")
const common = require("../../common/common")

exports.createProductCategory = async (req, res) => {
    let body = req.body;
    let response = {
        data: [],
        success: false,
        status_code: 500,
        message: "Failed to Insert Record. Try Again"
    };
    let dbResource = await dbData.getDBConnection();
    let collectionList = await dbResource.listCollections().toArray();
    let isCollectExist = common.isCollectionExist(collectionList, 'product_category');
    if (isCollectExist) {
        let sequence = await dbResource.collection('product_category').find({}).toArray();
        let result = await dbResource.collection('product_category').find({name: body.name}).toArray();
        if (result.length == 0) {
            response.success = true,
            response.status_code = 200,
            response.message = "Transaction Success",
            delete body.uid;
            body.updatedDate = Date(new Date()),
            body.referenceId = 'PR-C00'+ (sequence.length+1).toString(),
            console.log("BODY :", body);
            dbResource.collection('product_category').insertOne(body);
        }
    } else {
        response.message = "Collection not exist !",
        response.status_code = 101
    }
    res.send(response);
}

exports.getProductCategoryList = async (req, res) => {
    let response = {
        data: [],
        success: false,
        status_code: 500,
        message: "No Record Found."
    };
    let dbResource = await dbData.getDBConnection();
    let collectionList = await dbResource.listCollections().toArray();
    let isCollectExist = common.isCollectionExist(collectionList, 'product_category');
    if (isCollectExist) {
        let result = await dbResource.collection('product_category').find({}).toArray();

        response.data = result;
        response.success = true,
        response.status_code = 200,
        response.message = "Transaction Success",
        response.length = result.length
    } else {
        response.message = "Collection not exist !",
        response.status_code = 101
    }
    res.send(response);
}