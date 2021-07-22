const persPath = require('../persistencia/factory')
const moduloPersistencia = require (persPath)
const persistencia = moduloPersistencia.mensajes

class Mensaje {
    constructor(){

    }
    leer(){
        let resultado = persistencia.leer()
        return resultado
    }
    guardar(mensaje){
        let resultado = persistencia.guardar(mensaje)
        return resultado
    }
}

mensaje = new Mensaje;

module.exports = mensaje