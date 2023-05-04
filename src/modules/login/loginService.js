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
    //console.log("collection_name : ", collectionList);
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
                    response.success = true,
                    response.status_code = 200,
                    response.message = "Login Success",

                    dbResource.collection(header.collection).updateOne({userName : x.userName}, {$set:{token : generatedToken, last_login : Date(new Date().toLocaleString('en', {timeZone: 'Asia/Calcutta'}))}});
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
    //console.log("collection_name : ", collectionList);
    let isCollectExist = common.isCollectionExist(collectionList, header.collection);
    if (isCollectExist) {
        let result = await dbResource.collection(header.collection).find({}).toArray();
        result.forEach(async (x) => {
            if (x.access_token == header.token) {
                const token_created_date = header.token_created;
                // console.log("Date : ", date1); new Date();
                // var date2 = new Date("Thu May 04 2023 23:35:25 GMT+0530");
                // if (date1 > date2) {
                //     console.log("Correct");
                // } else {
                //     console.log("Wrong")
                // }
                if (x.last_password_change < token_created_date) {
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
