const mongoose = require('mongoose')

const model = { }

const MensajesSchema = new mongoose.Schema({
    email: {type: String, required: true},
    mensaje: {type:String},
    fechayhora: {type: Date, default: Date.now()}
    },
    {strict:false}
)
    
model.mensajes = mongoose.model('mensajes', MensajesSchema)

module.exports = model;
