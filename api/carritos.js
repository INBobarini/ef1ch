//const persistencia = require('../persistencia/persMensFS') //listado es un array, instancia de clase Producto
//const listado = persistencia.leer('../persistencia/productos.txt');

let proxIdCarrito = 0;
const carritos = [];

class Carrito {
    constructor(){
        this.id = ++proxIdCarrito;
        this.timestamp = Date.now();
        this.productos = [];
    }
    listar(idCarrito){ //no entiendo, un usuario tiene un unico carrito... tomo como id de carrito la posicion del producto, o sea que este metodo lista productos dentro de un carrito
        if(!carrito.productos.length) return {error:"carrito sin productos"}
        
        if(idCarrito == undefined){//si no recibe indice devuelve el array de productos en carrito
            return this.productos; 
        
        }
        return this.productos[idCarrito-1]
    }
    agregar(idProducto){         
        //this.productos.push(listado.find(e => e.id == idProducto))
    }
    borrar(idCarrito){
        return this.productos.splice(idCarrito-1,1)
    }
}
let carrito = new Carrito;
module.exports = carrito;

/*El router base '/carrito' implementará tres rutas:
'/listar/:id?' : Me permite listar todos los productos guardados en el carrito ó un producto por su id de carrito (producto??) (disponible para usuarios y administradores)
'/agregar/:id_producto' : Para incorporar productos al carrito por su id de producto (disponible para usuarios y administradores)
'/borrar/:id' : Eliminar un producto del carrito por su id de carrito (producto??) (disponible para usuarios y administradores)
*/

