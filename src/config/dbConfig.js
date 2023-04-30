// Get Connection From DB

const {MongoClient}= require("mongodb");
const { connection } = require("mongoose");
const url =  "mongodb+srv://anujk01997:sha512@los.7dk32hi.mongodb.net/test?authMechanism=DEFAULT";

const client = new MongoClient(url);

const getDBConnection = () => {
    return new Promise(async (resolve, reject) => {

        let result = await client.connect();
        let db = result.db('los');
        resolve(db);
        connection.close();
    })
}

exports.getDBConnection = getDBConnection;

// End Of Get Connection From DB 