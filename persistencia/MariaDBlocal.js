const knex = require ('knex')({
    client: 'mysql',
    connection: {
        host:'127.0.0.1',
        user: 'root',
        password:'',
        database:'ecommerce'
    }
})

/*const knex = require ('knex')({
    client:'sqlite3',
    connection: {filename:'./mydb.sqlite'},
    useNullAsDefault:true
})*/

class MariaDBProductos{
    constructor() {
        this.productos = this.iniciarTablaProductos;
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
    async listar(id){
        try{
            productos = JSON.parse(JSON.stringify(await knex.from('productos').select("*")))
            let producto = JSON.parse(JSON.stringify(
                await knex.from('productos').select("*").where('id',id)
                ))
            if(id===0) {
                return productos;
            }
            else { 
                return producto;
            }
        }
        catch(err){
            throw err
        }
    }
    async agregar(producto){
        try{
            let id = await knex('productos').insert(producto)//devuelve array con id
            return await knex.from('productos').select("*").where('id',id[0]);
        }
        catch(err){
            throw err
        } 
    }
    async actualizar(productoNuevo, productoViejo){
        try {
            let id = productoViejo[0].id
            let ok = await knex('productos').where('id',"=", id).update(productoNuevo)//devuelve 1 si actualizo ok, 0 si no
            return !ok? {error:"no se actualizo"} : productoNuevo
        }
        catch (err){
            throw err
        }
    }
    async borrar(productoBorrado){
        try {
            let id = productoBorrado[0].id
            console.log(id);
            let ok = await knex.from('productos').where('id', id).del() //devuelve 1 si borro ok, 0 si no
            return !ok? {error:"no se borró"} : productoBorrado
        }
        catch (err){
            throw err
        }
    }
}

class MariaDBMensajes{
    constructor() {
        this.mensajes = this.iniciarTablaMensajes();
    }
    async iniciarTablaMensajes(){
        let resultado = await knex.schema.hasTable('mensajes').then((exists)=>{
            if(!exists){  
                knex.schema.createTable('mensajes', table =>{
                    table.string('email')
                    table.string('fechayhora')
                    table.string('mensaje')
                    //table.increments('id')
                })
                .then(() => console.log("encabezados creados"))
                .then(()=> {return resultado})
            }
        })
        .catch((err) => {console.log(err); throw err})  
    }
    async leer(){
        try {
            let mensajes = JSON.parse(JSON.stringify(await knex.from('mensajes').select("*")))
            return mensajes;
        }
        catch(err){
            throw(err)
        }
    }
    async guardar(mensaje){
        try {
            mensaje.fechayhora = new Date().toLocaleString()
            let resultado = await knex('mensajes').insert(mensaje)//devuelve 0
            return mensaje; //TODO revisar que tiene que devolver
        }
        catch(err){
            throw(err)
        }
    }
}

let persistencia = {}
persistencia.productos = new MariaDBProductos;
persistencia.mensajes = new MariaDBMensajes;
module.exports = persistencia;
