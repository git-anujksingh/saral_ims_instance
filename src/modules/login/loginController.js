const login = require("./loginService");

exports.getLogin = async (req, res) => {
    await login.getLogin(req, res);
};