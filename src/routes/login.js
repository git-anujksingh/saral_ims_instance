const express = require('express');
const loginController = require("../modules/login/loginController");
const router = express.Router();


router.post('/authenticate', loginController.getLogin);

router.post('/isLogin', loginController.isLogged);

router.post('/logout', loginController.logout);

router.post('/render', loginController.render);

router.post('/register_knovator', loginController.registerknovator);

router.post('/update_knovator', loginController.updateknovator);

router.post('/list_knovator', loginController.listknovator);

router.post('/detail_knovator', loginController.detailknovator);

module.exports = router;