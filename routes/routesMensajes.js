const express = require('express')
var mensajes = require('../persistencia/dbmensajes') //no tiene controller

routerMensajes = express.Router();

mensajes.iniciarTablaMensajes();

routerMensajes.get('/', async(req, res) => {  
    let resultado = await mensajes.leer()
    res.json(resultado)
})
routerMensajes.post('/', async(req, res) => {
    let id = await mensajes.guardar(req.body)
    res.json(`Mensaje con id:${id} guardado`)
})

module.exports = routerMensajes