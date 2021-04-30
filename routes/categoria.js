const { Router } = require('express');
const { check } = require('express-validator');
const { categoriaGet, categoriaPost, categoriaPut, categoriaDelete } = require('../controllers/categoria');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');

const router = Router();

router.get('/', validarJWT, validarRol, categoriaGet);
router.post('/', validarJWT, validarRol, categoriaPost);
router.put('/:id', validarJWT, validarRol, categoriaPut);
router.delete('/:id', validarJWT, validarRol, categoriaDelete);

module.exports = router;