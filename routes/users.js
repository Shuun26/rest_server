const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/users');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const router = new Router();

router.get('/', validarJWT, validarRol, usuariosGet);

router.post(
    '/',
    validarJWT, validarRol, [check('correo', 'El correo es requerido o no es valido').isEmail()],
    usuariosPost);

router.put('/:id', validarJWT, validarRol, usuariosPut);

router.delete('/:id', validarJWT, validarRol, usuariosDelete);

module.exports = router;