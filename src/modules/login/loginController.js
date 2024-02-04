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

exports.registerknovator = async (req,res) =>{
    await login.registerknovator(req, res);
}

exports.getRecordKnovator = async (req,res) =>{
    await login.getRecordKnovator(req, res);
}

exports.updateknovator = async (req,res) =>{
    await login.updateknovator(req, res);
}

exports.listknovator = async (req,res) =>{
    await login.listknovator(req, res);
}
