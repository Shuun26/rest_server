const { Router } = require('express');
const { check } = require('express-validator');
const { productosGet, productosPost, productosPut, productosDelete } = require('../controllers/productos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const router = Router();

router.get('/', validarJWT, validarRol, productosGet);
router.post('/', validarJWT, validarRol, productosPost);
router.put('/:id', validarJWT, validarRol, productosPut);
router.delete('/:id', validarJWT, validarRol, productosDelete);

module.exports = router;