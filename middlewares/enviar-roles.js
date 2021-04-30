const { response, request } = require("express");
const Usuario = require("../models/user");

const enviarRol = async(req = request, res = response, next) => {
    let { correo } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        return res.status(401).json({
            msg: "No existe el usuario"
        })
    }
    try {
        //Envia el rol del usuario al controlador de auth...
        req.rol = usuario.rol;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Rol no valido",
        });
    }
}

module.exports = {
    enviarRol,
}