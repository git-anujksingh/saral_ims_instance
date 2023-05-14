const express = require('express');
const loginController = require("../modules/login/loginController");
const router = express.Router();


router.post('', loginController.getLogin);

router.post('/isLogin', loginController.isLogged);

router.post('/logout', loginController.logout);

router.post('/render', loginController.render);

module.exports = router;