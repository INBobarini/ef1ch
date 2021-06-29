let proxIdProducto = 0;
const persistencia = require("../persistencia/persistencia"); 
let productos = persistencia.leer();
class Producto {
    
    constructor(){
    }
    listar(idProducto){
        if (productos.length === 0){
            return {error:"no hay productos cargados"}
        }
        return productos.find(e => e.id == idProducto)||productos;
    }
    agregar(producto){
        let nuevoProducto = {
        id: ++proxIdProducto, 
        timestamp: Date.now(),
        }
        Object.assign(nuevoProducto, producto);
        productos.push(nuevoProducto);
        persistencia.guardar(productos);
        return productos.find(e => e.id == proxIdProducto)
    }
    actualizar(idProducto, productoActualizado){ //No actualiza timestamp
        if(productos.find(e => e.id == idProducto)=="undefined"){
            return {error: "producto no encontrado"}
        }
        let idActualizado = productos.findIndex(e => e.id == idProducto)
        Object.assign(productos[idActualizado], productoActualizado) 
        persistencia.guardar(productos);
        return productos[idActualizado];
    }
    borrar(idProducto){
        if(productos.find(e => e.id == idProducto)=="undefined"){
            return {error: "producto no encontrado"}
        }
        let idBorrado = productos.findIndex(e => e.id == idProducto)
        let productoBorrado = productos.splice(idBorrado,1)
        persistencia.guardar(productos);
        return productoBorrado;
    }
}
var listado = new Producto;
module.exports = listado; 

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


