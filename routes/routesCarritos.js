const express = require('express')
const carrito = require('../api/carritos')
routerCarrito = express.Router();

const administrador = true;
const auth = function (req, res, next) {
    if (req.body.administrador !== "true") {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    } else {
        next();
    }
}
routerCarrito.get('/', (req, res) => {
    console.log(`getCarrito con id: ${req.params.id}`)        
    res.json(carrito.listar(req.params.id))
})
routerCarrito.get('/:id', (req, res) => {
    console.log(`getCarrito con id: ${req.params.id}`)       
    res.json(carrito.listar(req.params.id))
})
routerCarrito.post('/:id', (req, res) => {
    console.log("PostCarrito: producto con id:")
    console.dir(req.params.id)   
    res.json(carrito.agregar(req.params.id))
})
routerCarrito.delete('/:id', (req, res) => {
    res.json(carrito.borrar(req.params.id))
    console.log(`producto borrado con id: ${req.params.id}`)
})



module.exports = routerCarrito;