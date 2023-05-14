const login = require("./loginService");

exports.getLogin = async (req, res) => {
    await login.getLogin(req, res);
}

exports.isLogged = async (req,res) =>{
    await login.isLogged(req, res);
}

exports.logout = async (req,res) =>{
    await login.logout(req, res);
}

exports.render = async (req,res) =>{
    await login.render(req, res);
}
