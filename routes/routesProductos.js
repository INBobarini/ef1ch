const express = require('express')
const productos = require('../api/productos')

routerProd = express.Router();

//requires prod
//buscar lo guardado en el fs

routerProd.get('/', (req, res) => {
    console.log(`get con id: ${req.params.id}`)    
    res.json(productos.listar(req.params.id))
})
routerProd.get('/:id', (req, res) => {
    res.json(productos.listar(req.params.id))
    console.log(`get con id: ${req.params.id}`)
})
routerProd.post('/', (req, res) => {
    console.log("Post:")
    console.dir(req.body)
    res.json(productos.agregar(req.body))
})
routerProd.put('/:id', (req, res) => {
    console.log(`put con id ${req.params.id}:`);
    console.dir(req.body);
    res.json(productos.actualizar(req.params.id, req.body))
})
routerProd.delete('/:id', (req, res) => {
    res.json(productos.borrar(req.params.id||req.params.id))
    console.log(`borrado con id: ${req.params.id}`)
})

module.exports = routerProd;
