const express = require('express');
const mailerController = require("../modules/mailer/mailerController");
const router = express.Router();


router.post('/sendmail', mailerController.mailerService);

module.exports = router;