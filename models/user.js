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
    rol: {
        type: String,
        default: "Cliente_Rol",
        require: [true, "Debe tener un rol asignado"],
        enum: ['Admin_Rol', 'Cliente_Rol']
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

module.exports = model('Usuario', usuarioSchema);