const mongoose = require('mongoose')

const persActiva = 2;
const modulePaths = [
                                    //0
    ,                               //1
    ,'../persistencia/MariaDBlocal' //2
    ,                               //3
    ,                               //4
    ,'../persistencia/MongoLocal'   //5
    ,'../persistencia/MongoAtlas'   //6
    ,                               //7
]
const urls = [
  //0
, //1
, //2
, //3
, //4
,'mongodb://localhost:27017/ecommerce'   //5
,'mongodb+srv://ivan:35529259@cluster0.zgagt.mongodb.net/ecommerce?retryWrites=true&w=majority'   //6
, //7
]

const url = urls[persActiva]

async function connectMongoDB(){
   await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
   console.log(`Base de datos Mongo en: ${url}`)
}
if(url) {connectMongoDB()}

module.exports = modulePaths[persActiva];
/*
1) File System (fs)
2) MySQL/MariaDB local
3) MySQL/MariaDB DBaaS
4) SQLite3
5) MongoDB Local
6) MongoDB DBaaS
7) Firebase
*/
//[Profesor] Emanuel Balcazar: mínimamente mysql local, MongoDB local y Mongo atlas, después si quieren agregan más

