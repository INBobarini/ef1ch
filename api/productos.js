const persPath = require('../persistencia/factory')
const moduloPersistencia = require (persPath)
const persistencia = moduloPersistencia.productos

class Producto {
    constructor(){
        this.productos = []
    }
    async listar(id){
        try{
            let resultado = await persistencia.listar(id)
            return resultado
        }
        catch(err){
            throw err
        }
    }
    async agregar(nuevoProducto){
        try{
            let productoGuardado = await persistencia.agregar(nuevoProducto)
            return productoGuardado
        }
        catch(err){
            throw err
        }
    }
    async actualizar(idProducto, productoNuevo){
        try{
            let productoViejo = await persistencia.listar(idProducto)
            let resultado = await persistencia.actualizar(productoNuevo, productoViejo)
            return resultado
        }
        catch(err){
            throw err
        }
    }
    async borrar(idProducto){
        try{
            let productoBorrado = await persistencia.listar(idProducto)
            let resultado = await persistencia.borrar(productoBorrado)
            return resultado
        }
        catch(err){
            throw err
        }
    }
}

productos = new Producto;

module.exports = productos
 
//console.log(await model.productos.find({descripcion:"borra"},{nombre:1,precio:1,stock:1,_id:0}).limit(2))

/*
El router base '/productos' implementará cuatro rutas:
'/listar/:id?' : Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
'/agregar' : Para incorporar productos al listado (disponible para administradores)
'/actualizar/:id' : Actualiza un producto por su id (disponible para administradores)
'/borrar/:id' : Borra un producto por su id (disponible para administradores)
*/
/*
prod1 = {nombre:"sacapuntas", descripcion:"saca la punta", codigo:"e423", foto:"url", precio:50,stock:20}
prod2 = {nombre:"goma", descripcion:"borra", codigo:"e443", foto:"url", precio:30,stock:40}
prod = new Producto();
prod.agregar(prod1)
prod.agregar(prod2)
prod2b = {nombre:"regla", descripcion:"para medir", codigo:"e443", foto:"url", precio:40, stock:5}
prod.actualizar(2,prod2b);
prod.borrar(1);
console.log(prod.listar(0))
*/


