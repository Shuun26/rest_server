const express = require('express');
const cors = require('cors');
const { conex } = require('./../database/config');
/* const bodyParser = require('body-parser'); */

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/usuarios';
        this.authPath = '/auth';
        this.categoriaPath = "/categoria";
        this.productosPath = '/producto';
        /* Conexión a db */
        this.dbConex();


        /* Middlewares */
        this.middlewares();
        /* Routes */
        this.routes();
    }

    async dbConex() {
        await conex();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        //Permite obtener JSON desde el body
        this.app.use(express.json());
        /* this.app.use(bodyParser.json()); */
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/users'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.productosPath, require('../routes/productos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servido corriendo en el puerto', this.port);
        })
    }
}

module.exports = Server;