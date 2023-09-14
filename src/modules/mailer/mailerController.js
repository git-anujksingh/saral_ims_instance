const mailerService = require('./mailerService');

exports.mailerService = async (req, res) => {
    await mailerService.sendMail(req, res);
}
