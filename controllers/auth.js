const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('./../models/user');
const { generarToken } = require('../helper/generar-jwt');

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verificar que el correo exista
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectos (Usuario)",
            })
        }

        //Verificar que el usuario este activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectos (Estado)",
            })
        }

        //Verificar que la contraseña sea correcta
        const validarPass = bcrypt.compareSync(password, usuario.password);
        if (!validarPass) {
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectos (Contraseña)",
            })
        }

        //Crear token
        const token = await generarToken(usuario.id);

        res.json({
            msg: "Login exitoso",
            correo,
            password,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Ups. Algo salió mal, intentalo de nuevo después de un momento...",
            error
        })
    }
}

module.exports = {
    login,
}