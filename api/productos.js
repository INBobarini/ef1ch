var persistencia = require('../persistencia/dbproductos')
const model = require ('../persistencia/modelProducto')
const mongoose = require ('mongoose');


class Producto {
     constructor(){
        this.productos = [];
    }
    async listar(id){
        try{
            this.productos = await model.productos.find({})
            if (this.productos.length === 0){
                return {error:"no hay productos cargados"}
            }
            if(id==0){
                return this.productos
            }
            else{
                return this.productos[id-1]
            }
        }
        catch(err){
            throw err
        }
    }
    async agregar(nuevoProducto){
        try{
            let productoGuardado = await model.productos.create(nuevoProducto)
            return productoGuardado
        }
        catch(err){
            throw err
        }
    }
    async actualizar(idProducto, producto){
        try{
            this.productos = await model.productos.find({})
            if(idProducto>this.productos.length){
                return {error:"producto no encontrado"}
            }
            else{
                let id = this.productos[idProducto-1]._id;
                let resultado = await model.productos.updateOne({_id:id}, {$set: producto})
                return resultado
            }
        }
        catch(err){
            throw err
        }
    }
    async borrar(idProducto){
        try{
            this.productos = await model.productos.find({})
            if(idProducto>this.productos.length){
                return {error:"producto no encontrado"}
            }
            else{
                let id = this.productos[idProducto-1]._id;
                let resultado = await model.productos.deleteOne({_id:id})
                return resultado
            }
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


