const listado = require("./productos") //listado es un array, instancia de clase Producto
let proxIdCarrito = 0;
const carritos = [];
class Carrito {
    constructor(){
        this.id = ++proxIdCarrito;
        this.timestamp = Date.now();
        this.productos = [];
    }
    listar(idCarrito){ //no entiendo, un usuario tiene un unico carrito... tomo como id de carrito la posicion del producto, o sea que este metodo lista productos dentro de un carrito
        if(idCarrito == "undefined"){//si no recibe indice devuelve el array de productos en carrito
            return this.productos; 
        }
        if(typeof idCarrito != "number" || idCarrito < carrito.length){
            return {error: "indice incorrecto"}
        }
        return this.productos[idCarrito-1]
    }
    agregar(idProducto){         
        //this.productos.push(listado.find(e => e.id == idProducto))
        let indexCarrito = carritos.findIndex(e => e.id == carrito.id)
        //return carritos.splice(indexCarrito-1, 1, this) //al cambiar un carrito, se actualiza el arreglo de carritos
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

