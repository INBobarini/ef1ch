const knex = require ('knex')({
        client:'sqlite3',
        connection: {filename:'./mydb.sqlite'},
        useNullAsDefault:true
})

class PersistenciaMensajes{
    constructor() {
    }
    async iniciarTablaMensajes(){
        let resultado = await knex.schema.hasTable('mensajes').then((exists)=>{
            if(!exists){  
                knex.schema.createTable('mensajes', table =>{
                    table.string('email')
                    table.string('fechayhora')
                    table.string('mensaje')
                    table.increments('id')
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
            let resultado = await knex('mensajes').insert(mensaje)//devuelve array con id
            return resultado[0];
        }
        catch(err){
            throw(err)
        }
    }
}
module.exports = new PersistenciaMensajes;