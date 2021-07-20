const express = require('express')
var mensajes = require('../api/mensajes') 

const mongoose = require ('mongoose');

routerMensajes = express.Router();


routerMensajes.get('/', async(req, res) => {  
    let resultado = await mensajes.leer()
    res.json(resultado)
})
routerMensajes.post('/', async(req, res) => {
    let resultado = await mensajes.guardar(req.body)
    res.json(resultado)
})

module.exports = routerMensajes