const express = require('express');
const loginController = require("../modules/login/loginController");
const router = express.Router();


router.post('', loginController.getLogin);

router.post('/logged', loginController.isLogged);

module.exports = router;