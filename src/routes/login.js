const express = require('express');
const loginController = require("../modules/login/loginController");
const router = express.Router();


router.post('', loginController.getLogin);

module.exports = router;