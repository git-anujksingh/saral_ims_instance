require("dotenv").config();
const express = require("express");
require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({endpoint: 'https://s3.filebase.com', signatureVersion: 'v4'});
const app = express();
var cors = require('cors');
process.env.TZ ="Asia/Calcutta"
app.use(cors());
const dbConfig = require("./src/config/dbConfig");
app.locals.dbConfig = dbConfig;
app.use(express.json());
const loginRoute = require("./src/routes/login")


app.use('/api', loginRoute);

const PORT = process.env.PORT || 5000;
//app.set('PORT', process.env.PORT);

var listner = app.listen(PORT , ()=>{
    console.log("Instance Running !!", listner.address().port);
});

module.exports = app;
