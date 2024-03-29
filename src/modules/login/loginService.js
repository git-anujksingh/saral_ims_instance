const dbData = require("./../../config/dbConfig")
const common = require("../../common/common")
const jwt = require('jsonwebtoken');
const emailer = require("./../mailer/mailerController");

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
    let isCollectExist = common.isCollectionExist(collectionList, 'c_login');
    if (isCollectExist) {
        let result = await dbResource.collection('c_login').find({}).toArray();
        for(let i= 0; i < result.length; i++){
            if (result[i].userName == body.userName && result[i].password == body.password && (result[i].login_status == false || body?.userResponse)) {
                let generatedToken = jwt.sign({ _id: result[i]._id }, 'saral_lms');
                let jwtDecode = jwt.verify(generatedToken, 'saral_lms');
                response.data[0] = { ...result[i] },
                delete response.data[0].password;
                delete response.data[0].token;
                delete response.data[0].token_expiry;
                console.log("AQS:", response.data[0]);
                response.data[0].token = generatedToken;
                response.data[0].token_expiry = jwtDecode.iat;
                response.success = true,
                response.status_code = 200,
                response.message = "Login Success",
                dbResource.collection('c_login').updateOne({ userName: result[i].userName }, { $set: { token: generatedToken, token_expiry: jwtDecode.iat, login_status: true, last_login: Date(new Date()) } });
                
            } else if (result[i].userName == body.userName && result[i].password == body.password && result[i].login_status == true  && !body?.userResponse) {
                    response.success = true,
                    response.status_code = 401,
                    response.message = "User Already have Active Session. Are you sure to Inactive Earlier Session ??"
            } 
            // else if (i.userName == body.userName && body?.userResponse == true) {
            //     let generatedToken = jwt.sign({ _id: i._id }, 'saral_lms');
            //     response.data.token = generatedToken;
            //     response.data[0] = { ...i },
            //     delete response.data[0].password;
            //     response.success = true,
            //     response.status_code = 200,
            //     response.message = "Login Success",
            //     dbResource.collection('c_login').updateOne({ userName: i.userName }, { $set: { token: generatedToken, login_status: true, last_login: Date(new Date()) } });
            // }
        }
    } else {
        response.message = "Collection not exist !",
        response.status_code = 101
    }
    res.send(response);
}

exports.isLogged = async (req, res) => {
    let body = req.body;
    let response = {
        data: [],
        success: true,
        status_code: 200,
        message: "Token Expired"
    };
    let header = req.headers;
    let dbResource = await dbData.getDBConnection();
    let collectionList = await dbResource.listCollections().toArray();
    let isCollectExist = common.isCollectionExist(collectionList, 'c_login');
    if (isCollectExist) {
        let result = await dbResource.collection('c_login').find({}).toArray();
        if (body.access_token) {
            let jwtDecode = jwt.verify(body.access_token, 'saral_lms');
            console.log(">>>>", jwtDecode.iat);
            result.forEach(async (x) => {
                console.log("<<<<", x.token_expiry);
                if (x._id == jwtDecode._id && x.token_expiry == jwtDecode.iat ) {
                    const token_created_date = new Date(x.token_created);
                    if ((Date.parse(x.last_password_change) < Date.parse(token_created_date))) {
                        response.data[0] = { ...x },
                        delete response.data[0].password;
                        response.success = true,
                        response.status_code = 200,
                        response.message = "Login Success"
                    } else if((Date.parse(x.last_password_change) > Date.parse(token_created_date))) {
                        response.success = true,
                        response.status_code = 403,
                        response.message = "Password Changed"
                    } else {
                    response.success = true,
                    response.status_code = 502,
                    response.message = "Session Expired"
                }
                }
            });
        } else {
            response.status_code = 402
        }
    } else {
        response.message = "Collection not exist !",
        response.status_code = 101
    }
    res.send(response);
}

    exports.logout = async (req, res) => {
        let body = req.body;
        let response = {
            data: [],
            success: false,
            status_code: 500,
            message: "Failed to Logout. Try Again"
        };
        let dbResource = await dbData.getDBConnection();
        let collectionList = await dbResource.listCollections().toArray();
        let isCollectExist = common.isCollectionExist(collectionList, 'c_login');
        if (isCollectExist) {
            let result = await dbResource.collection('c_login').find({}).toArray();
            result.forEach(async (x) => {
                if (x.userName == body.userId) {
                    response.success = true,
                    response.status_code = 200,
                    response.message = "Logout Success",
                    dbResource.collection('c_login').updateOne({ userName: x.userName }, { $set: { login_status: false } });
                }
            })
        } else {
            response.message = "Collection not exist !",
            response.status_code = 101
        }
        res.send(response);
    }

    exports.render = async (req, res) => {
        let body = req.body;
        let response = {
            data: [],
            success: false,
            status_code: 500,
            message: "Failed to Logout. Try Again"
        };
        let dbResource = await dbData.getDBConnection();
        let collectionList = await dbResource.listCollections().toArray();
        let isCollectExist = common.isCollectionExist(collectionList, 'c_login');
        if (isCollectExist) {
            let result = await dbResource.collection('c_login').find({}).toArray();
            result.forEach(async (x) => {
                if (x.userName == body.userId) {
                    response.success = true,
                    response.status_code = 200,
                    response.message = "Render is Working"
                }
            });
            emailer.mailerService(body);
        } else {
            response.message = "Collection not exist !",
            response.status_code = 101
        }
        res.send(response);
    }


    // ----------knovator------------

    exports.registerknovator = async (req, res) => {
        let body = req.body;
        let response = {
            data: [],
            success: false,
            status_code: 500,
            message: "Failed to Register. Try Again"
        };
        let dbResource = await dbData.getDBConnection();
        let collectionList = await dbResource.listCollections().toArray();
        let isCollectExist = common.isCollectionExist(collectionList, 'knovator');
        if (isCollectExist) {
            let sequence = await dbResource.collection('knovator').find({}).toArray();
            let result = await dbResource.collection('knovator').find({email: body.email}).toArray();
            if (result.length == 0) {
                response.success = true,
                response.status_code = 200,
                response.message = "Transaction Success",
                body.updatedDate = Date(new Date()),
                body.referenceId = 'KNOVATOR_ID-C00'+ (sequence.length+1).toString(),
                dbResource.collection('knovator').insertOne(body);
            }
        } else {
            response.message = "Collection not exist !",
            response.status_code = 101
        }
        res.send(response);
    }
    
    exports.listknovator = async (req, res) => {
        let response = {
            data: [],
            success: false,
            status_code: 500,
            message: "No Record Found."
        };
        let dbResource = await dbData.getDBConnection();
        let collectionList = await dbResource.listCollections().toArray();
        let isCollectExist = common.isCollectionExist(collectionList, 'knovator');
        if (isCollectExist) {
            let result = await dbResource.collection('knovator').find({}).toArray();
    
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

    exports.getRecordKnovator = async (req, res) => {
        let body = req.body;
        let response = {
            data: [],
            success: false,
            status_code: 500,
            message: "Failed to Get Record. Try Again"
        };
        let dbResource = await dbData.getDBConnection();
        let collectionList = await dbResource.listCollections().toArray();
        let isCollectExist = common.isCollectionExist(collectionList, 'knovator');
        if (isCollectExist) {
            let result = await dbResource.collection('knovator').find({email: body.email}).toArray();
            console.log(result);
            if (result.length == 1) {
                response.success = true,
                response.status_code = 200,
                response.message = "Record Fetched Successfully !",
                response.data = result;
            }
        } else {
            response.message = "Collection not exist !",
            response.status_code = 101
        }
        res.send(response);
    }

    exports.updateknovator = async (req, res) => {
        let body = req.body;
        let response = {
            data: [],
            success: false,
            status_code: 500,
            message: "Failed to Update. Try Again"
        };
        let dbResource = await dbData.getDBConnection();
        let collectionList = await dbResource.listCollections().toArray();
        let isCollectExist = common.isCollectionExist(collectionList, 'knovator');
        if (isCollectExist) {
            let result = await dbResource.collection('knovator').find({email: body.email}).toArray();
            if (result.length == 1) {
                response.success = true,
                response.status_code = 200,
                response.message = "Record Updated Successfully !",
                dbResource.collection('knovator').updateOne({ email: result[0].email }, { $set: { name: body.name, age: body.age, city: body.city, address: body.address, orgName: body.orgName } });
            }
        } else {
            response.message = "Collection not exist !",
            response.status_code = 101
        }
        res.send(response);
    }
    
