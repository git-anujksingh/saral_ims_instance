const login = require("./loginService");

exports.getLogin = async (req, res) => {
    await login.getLogin(req, res);
}

exports.isLogged = async (req,res) =>{
    await login.isLogged(req, res);
}
