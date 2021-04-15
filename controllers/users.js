const { response, request } = require('express');
const Usuario = require('./../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGet = async(req = request, res = response) => {
    const usuarios = await Usuario.find();
    res.json({
        msg: 'Api - Get',
        usuarios
    });
}

const usuariosPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    }

    let { nombre, correo, password, estado } = req.body;

    const usuario = new Usuario({ nombre, correo, password, estado });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //correo existente
    const existeMail = await Usuario.findOne({ correo });
    if (existeMail) {
        return res.status(400).json({
            msg: "Email ya registrado"
        });
    }

    usuario.save();

    res.json({
        msg: 'Api - Post',
        usuario,
    });
}

const usuariosPut = async(req = request, res = response) => {
    const id = req.params.id;
    let { password, ...resto } = req.body;

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Api - Put',
        id,
        usuario
    });
}

const usuariosDelete = async(req = request, res = response) => {
    const id = req.params.id;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'Api - Delete',
        usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}