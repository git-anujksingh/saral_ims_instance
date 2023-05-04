const dbData = require("./../../config/dbConfig")
const common = require("../../common/common")
const jwt = require('jsonwebtoken');

exports.getLogin = async (req, res) => {
    let body = req.body;
    let response = {
        data: [],
        success: false,
        status_code: 500,
        message: "Login Failed"
    };
    let header = req.headers;
    let dbResource = await dbData.getDBConnection();
    let collectionList = await dbResource.listCollections().toArray();
    let isCollectExist = common.isCollectionExist(collectionList, header.collection);
    if (isCollectExist) {
        let result = await dbResource.collection(header.collection).find({}).toArray();
        result.forEach(async (x) => {
            if (x.userName == body.userName && x.password == body.password) {
                let generatedToken = jwt.sign({ _id: x._id }, 'saral_lms');
                let ss = new Date();
                let k = ss;
                //console.log("AAAAAAAAA", Date(new Date()('en', {timeZone: 'Asia/Calcutta'})));
                response.data.token = generatedToken;
                    response.data = { ...x },
                    delete response.data.password;
                    response.success = true,
                    response.status_code = 200,
                    response.message = "Login Success",
                    dbResource.collection(header.collection).updateOne({userName : x.userName}, {$set:{token : generatedToken, last_login : Date(new Date())}});
            }
        })
    } else {
        response.message = "Collection not exist !"
    }
    res.send(response);
}

exports.isLogged = async (req, res) => {
    let body = req.body;
    let response = {
        data: [],
        success: false,
        status_code: 500,
        message: "Authorization Fail"
    };
    let header = req.headers;
    let dbResource = await dbData.getDBConnection();
    let collectionList = await dbResource.listCollections().toArray();
    let isCollectExist = common.isCollectionExist(collectionList, header.collection);
    if (isCollectExist) {
        let result = await dbResource.collection(header.collection).find({}).toArray();
        result.forEach(async (x) => {
            if (x.token == header.token) {
                const token_created_date = new Date (x.token_created);
                if((Date.parse(x.last_password_change) < Date.parse(token_created_date))){
                    response.data = { ...x },
                    response.success = true,
                    response.status_code = 200,
                    response.message = "Authorization Success"
                } else {
                    response.success = false,
                    response.status_code = 404,
                    response.message = "Token Expired"
                }
            }
        })
    } else {
        response.message = "Collection not exist !"
    }
    res.send(response);

}
