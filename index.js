const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
const dbConfig = require("./src/config/dbConfig");
app.locals.dbConfig = dbConfig;
app.use(express.json());
const loginRoute = require("./src/routes/login")


app.use('/login', loginRoute);


var listner = app.listen(5000 , ()=>{
    console.log("Instance Running !!", listner.address().port);
});

module.exports = app;
