const { response, request } = require('express');
const atob = require("atob");
const Productos = require('../models/producto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const productosGet = async(req = request, res = response) => {
    const rol = req.rol;
    if (!rol) {
        return res.status(401).json({
            msg: "No existe este rol"
        })
    }
    if (rol === "Admin_Rol") {
        const productos = await Productos.find();
        return res.json({
            msg: 'Api - Get',
            productos
        });
    } else {
        let token = req.header("x-token");
        token = JSON.parse(atob(token.split(".")[1]));

        const productos = await Productos.find({ usuario: token.uid });

        return res.json({
            msg: 'Api - Get',
            productos
        });
    }
}

const productosPost = async(req = request, res = response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors,
        });
    }

    let { nombre, estado, usuario, precio, categoria, descripcion, disponible } = req.body;

    const productos = new Productos({ nombre, estado, usuario, precio, categoria, descripcion, disponible });

    productos.save();

    res.json({
        msg: 'Api - Post',
        productos,
    });
}

const productosPut = async(req = request, res = response) => {
    const id = req.params.id;
    let {...resto } = req.body;

    const productos = await Productos.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Api - Put',
        productos
    });
}

const productosDelete = async(req = request, res = response) => {
    const id = req.params.id;
    const productos = await Productos.findByIdAndUpdate(id, { estado: false });
    res.json({
        msg: 'Api - Delete',
        productos
    });
}


module.exports = {
    productosGet,
    productosPost,
    productosPut,
    productosDelete
}