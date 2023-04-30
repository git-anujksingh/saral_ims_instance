const dbData = require("./../../config/dbConfig")
const common = require("../../common/common")
exports.getLogin = async (req, res) => {
    let body = req.body;
    let response = {
        success: false,
        status_code: 500,
        message: "Login Failed"
    };
    let collection_name = req.headers.collection;
    let dbResource = await dbData.getDBConnection();
    let collectionList = await dbResource.listCollections().toArray();
    //console.log("collection_name : ", collectionList);
    let isCollectExist = common.isCollectionExist(collectionList,collection_name);
    if (isCollectExist) {
        let result = await dbResource.collection(collection_name).find({}).toArray();
        result.forEach((x) => {
            if (x.userName == body.userName && x.password == body.password) {
                response.success = true,
                response.status_code= 200,
                    response.message = "Login Success.............."
            }
        })
    }
    res.send(response);
}


