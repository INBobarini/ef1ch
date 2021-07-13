const {options} = require('./mariaDb')
const knex = require ('knex')(options)

class Persistencia{
    constructor() {
    }
    async iniciarTablaProductos(){
        let resultado = await knex.schema.hasTable('productos').then((exists)=>{
            if(!exists){  //crea la tabla de productos
                knex.schema.createTable('productos', table =>{
                    table.string('nombre')
                    table.string('descripcion')
                    table.string('codigo')
                    table.string('foto')
                    table.integer('precio')
                    table.integer('stock')
                    table.integer('timestamp')
                    table.increments('id')
                })
                .then(() => console.log("encabezados creados"))
                .then(()=> {return resultado})
            }
        })
        .catch((err) => {console.log(err); throw err})  
    }
    async listarProductos(){
        try{
             let productos = JSON.parse(JSON.stringify(await knex.from('productos').select("*")))
             return productos;
        }
        catch(err){
            throw err
        }
    }
    async agregarProducto(producto){
        try{
            let resultado = await knex('productos').insert(producto)//devuelve array con id
            return resultado[0];
        }
        catch(err){
            throw err
        } 
    }
    async actualizarProducto(id, producto){
        try {
            let respuesta = await knex('productos').where('id',"=", id).update(producto)//devuelve 1 si actualizo ok, 0 si no
            return respuesta
        }
        catch (err){
            throw err
        }
    }
    async borrarProducto(id){
        try {
            let respuesta = await knex.from('productos').where('id', id).del() //devuelve 1 si borro ok, 0 si no
            return respuesta
        }
        catch (err){
            throw err
        }
    }
}
module.exports = new Persistencia;
//borrar todo ->
/*knex.from('cars').del()
.then(() => console.log("all cars deleted"))
.catch((err) => {console.log(err); throw err})
.finally(() => {knex.destroy()})*/

//var producto = {title:"goma",price:30,thumbnail:"url"}
//var productoNuevo = {title:"escuadra",price:60,thumbnail:"url"}
//persistencia.iniciarTablaProductos();
//persistencia.agregarProducto(producto);
//console.log(persistencia.listarProductos());
//console.log(persistencia.actualizarProducto(1, productoNuevo))
//persistencia.borrarProducto(3);