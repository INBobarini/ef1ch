require('dotenv').config()
const express = require ('express');

const routerProductos = require('./routes/routesProductos.js')
const routerCarritos = require('./routes/routesCarritos.js')
const routerMensajes = require('./routes/routesMensajes.js')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarritos)
app.use('/mensajes', routerMensajes)

app.use((err,req,res,next)=>{
   console.error(err.message);
   res.status(500).send(err);
})



const PORT = process.env.PORT||8080
const server = app.listen(PORT, () => { 
   console.log(`Servidor inicializado en ${server.address().port}`) 
})
server.on("error", error => console.log(`Error en servidor: ${error}`))