const express = require('express')
const productos = require('../api/productos');

routerProd = express.Router();

const auth = function (req, res, next) {
    const administrador = true;
    if (administrador !== true ) {
        res.status(401).send({ error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` })
    } else {
    }
}

routerProd.get('/', async(req, res) => {
    console.log(`get con id: ${req.params.id}`)    
    let resultado = await productos.listar(0)
    res.json(resultado)
})
routerProd.get('/:id', async(req, res) => {
    console.log(`get con id: ${req.params.id}`)
    let resultado = await productos.listar(req.params.id)
    res.json(resultado)
})
routerProd.post('/', async(req, res) => {
    console.log("Post:")
    console.dir(req.body)
    let resultado = await productos.agregar(req.body)
    res.json(resultado)
})
routerProd.put('/:id'/*, auth*/, async(req, res) => {
    //auth(req,res)
    console.log(`put con id ${req.params.id}:`);
    console.dir(req.body);
    let resultado = await productos.actualizar(req.params.id, req.body)
    res.json(resultado)
    
})
routerProd.delete('/:id'/*, auth*/, async(req, res) => {
    console.log(`borrado con id: ${req.params.id}`)
    let resultado = await productos.borrar(req.params.id)
    res.json(resultado)
    //auth(req,res,next)
    
})

module.exports = routerProd;
