const fs = require('fs')

class Persistencia{
    constructor(){

    }
    leer(){//si hay objetos almacenados los carga, si no inicializa un array
        const data = fs.readFileSync('./productos.txt', 'utf-8')
        if(data) return JSON.parse(data);
        else return []
    }
    guardar(obj){ //lee el array almacenado, le agrega el nuevo objeto y almacena
        let array = this.leer()
        if(obj) array.push(obj);
        let data = JSON.stringify(array);
        fs.writeFileSync('./productos.txt', data)
        return array;
    }
}
const persistencia = new Persistencia;

module.exports = persistencia;
