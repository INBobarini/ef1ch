const mongoose = require('mongoose')

const ProductosSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type:String},
    codigo: {type:String},
    foto: {type:String},
    precio:{type:Number, required: true, max:99999999},    
    stock: {type:Number, required:true, max:99999},
    timestamp: {type: Date, default: Date.now()}
    },{strict:false})

const MensajesSchema = new mongoose.Schema({
    email: {type: String, required: true},
    mensaje: {type:String},
    fechayhora: {type: Date, default: Date.now()}
    },
    {strict:false}
)

class MongoProductos{
    constructor(){
        this.productos = mongoose.model('productos', ProductosSchema)
    }
    async listar(id){
        try{
            if(id===0) {
                console.log("0"); 
                return await this.productos.find({}) 
            }
            else {
                console.log(id); 
                return await this.productos.find({}).skip(id-1).limit(1) //DEVUELVE UN ARRAY DE UNICO ELEMENTO
            }
        }
        catch(err){
            throw err
        }
    }
    async agregar(producto){
        try{
            let resultado = await this.productos.create(producto)
            return resultado
        }
        catch(err){
            throw err
        }
    }
    async actualizar(productoNuevo, productoViejo){
        try{
            let resultado = await this.productos.updateOne({_id:productoViejo[0]._id}, {$set: productoNuevo})
            return resultado
            }
        catch(err){
            throw err
        }
    }
    async borrar(productoBorrado){
        try{
            let resultado = await this.productos.deleteOne({_id:productoBorrado[0]._id})
            return resultado
        }
        catch(err){
            throw err
        }
    }
}

class MongoMensajes{
    constructor(){
        this.mensajes = mongoose.model('mensajes', MensajesSchema)
    }
    async leer(){
        let resultado = await this.mensajes.find({})
        return resultado
    }
    async guardar(mensaje){
        let resultado = await this.mensajes.create(mensaje)
        return resultado
    }
}

let persistencia = {}
persistencia.productos = new MongoProductos;
persistencia.mensajes = new MongoMensajes
module.exports = persistencia;
