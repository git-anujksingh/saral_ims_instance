require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')
app.use(cors())
const dbConfig = require("./src/config/dbConfig");
app.locals.dbConfig = dbConfig;
app.use(express.json());
const loginRoute = require("./src/routes/login")


app.use('/login', loginRoute);

const PORT = process.env.PORT || 5000;
//app.set('PORT', process.env.PORT);

var listner = app.listen(PORT , ()=>{
    console.log("Instance Running !!", listner.address().port);
});

module.exports = app;
