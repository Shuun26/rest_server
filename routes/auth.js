const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { enviarRol } = require('../middlewares/enviar-roles');

const router = new Router();

router.post('/login', enviarRol, login);

module.exports = router;