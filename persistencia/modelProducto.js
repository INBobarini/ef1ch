const mongoose = require('mongoose')

const model = { }

const ProductosSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type:String},
    codigo: {type:String},
    foto: {type:String},
    precio:{type:Number, required: true, max:99999999},    
    stock: {type:Number, required:true, max:99999},
    timestamp: {type: Date, default: Date.now()}
    },{strict:false})

model.productos = mongoose.model('productos', ProductosSchema)

module.exports = model;

