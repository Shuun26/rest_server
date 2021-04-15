const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('Usuario', usuarioSchema);