const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const conex = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa');
    } catch (error) {
        console.log('No se pudo conectar a la base de datos');
        console.log(error);
    }
};

module.exports = {
    conex,
}