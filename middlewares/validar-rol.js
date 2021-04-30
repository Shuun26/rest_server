const { response, request } = require("express");
const atob = require("atob");
const Usuario = require("../models/user");

const validarRol = async(req = request, res = response, next) => {
    let token = req.header("x-token");
    //Se le hace split al token para tomar la parte del payload, luego se lo decodifica con la libreria atob, para finalmente parsearlo a un objeto JSON
    token = JSON.parse(atob(token.split(".")[1]));
    //Buscamos al usuario por su ID gracias al token previamente parseado
    let usuario = await Usuario.findById(token.uid);

    if (!usuario) {
        return res.status(401).json({
            msg: "No existe el usuario para ese token",
        })
    }
    try {
        req.rol = usuario.rol;
        //Verifica que el metodo sea distinto a get para hacer la validación, puesto que un cliente y un admin pueden hacer get, pero solo el admin puede usar post, put y delete
        if (req.method !== "GET") {
            if (usuario.rol !== "Admin_Rol") {
                return res.status(403).json({
                    msg: "No tienes los permisos para acceder aquí..."
                })
            } else {
                next();
            }
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no valido",
        });
    }

}

module.exports = {
    validarRol,
}