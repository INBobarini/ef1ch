const model = require ('../persistencia/modelMensaje')
const mongoose = require ('mongoose');

class Mensaje {
    constructor(){

    }
    leer(){
        let resultado = model.mensajes.find({})
        return resultado
    }
    guardar(mensaje){
        let resultado = model.mensajes.create(mensaje)
        return resultado
    }
}

mensaje = new Mensaje;

module.exports = mensaje