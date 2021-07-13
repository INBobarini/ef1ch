var persistencia = require('../persistencia/dbproductos')

class Producto {
     constructor(){
        this.productos = [];
    }
    async listar(id){
        try{
            this.productos = await persistencia.listarProductos()//carga en memoria
            
            if (this.productos.length === 0){
                return {error:"no hay productos cargados"}
            }
            if(id==0){
                return this.productos
            }
            else{
                return this.productos.find(e=>e.id==id)
            }
        }
        catch(err){
            throw err
        }
    }
    async agregar(nuevoProducto){
        try{
            nuevoProducto.timestamp = Date.now();
            let id = await persistencia.agregarProducto(nuevoProducto)
            let resultado = await this.listar(id)
            return resultado
        }
        catch(err){
            throw err
        }
    }
    async actualizar(idProducto, productoActualizado){ //No actualiza timestamp
        try{
            let ok = await persistencia.actualizarProducto(idProducto, productoActualizado)
            if(!ok){
                return {error:"producto no encontrado"}
            } 
            else {
                productoActualizado.id = idProducto 
                return productoActualizado
            }
        }
        catch(err){
            throw err
        }
    }
    async borrar(idProducto){
        try{
            let listado = await persistencia.listarProductos()
            let productoBorrado = listado.find(e=>e.id==idProducto);
            let ok = await persistencia.borrarProducto(idProducto);
            if(!ok){
                return {error:"producto no encontrado"}
            } 
            else {
                return productoBorrado
            }
        }
        catch(err){
            throw err
        }
    }
}
productos = new Producto;
productos.productos = persistencia.listarProductos(); //carga los productos en memoria para que esten listos antes de recibir requests, no funciona si no hay tabla
module.exports = productos
 


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


