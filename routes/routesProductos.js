const express = require('express')
const productos = require('../api/productos')

routerProd = express.Router();

const auth = function (req, res, next) {
    const administrador = true;
    if (administrador !== true ) {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    } else {
        next();
    }
}
routerProd.get('/', (req, res) => {
    console.log(`get con id: ${req.params.id}`)    
    res.json(productos.listar(req.params.id))
})
routerProd.get('/:id', (req, res) => {
    console.log(`get con id: ${req.params.id}`)
    res.json(productos.listar(req.params.id))
})
routerProd.post('/', auth , (req, res) => {
    console.log("Post:")
    console.dir(req.body)
    res.json(productos.agregar(req.body))
})
routerProd.put('/:id', auth, (req, res) => {
    console.log(`put con id ${req.params.id}:`);
    console.dir(req.body);
    auth(req,res)
    res.json(productos.actualizar(req.params.id, req.body))
})
routerProd.delete('/:id', auth, (req, res) => {
    res.json(productos.borrar(req.params.id||req.params.id))
    //auth(req,res,next)
    console.log(`borrado con id: ${req.params.id}`)
})

module.exports = routerProd;
