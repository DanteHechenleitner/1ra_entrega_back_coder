import express from 'express';
import productRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './dao/fileManager/api/productManager.js';



//MongoDB
import routerProducts from './routes/productsM.js';
import routerCarts from './routes/cartsM.js';

import { init } from './dao/mongoDB/mongoDB.js';

//import routerSessions from "./dao/mongoManager/indexSessions.js"
import routerSessions from "./routes/sessions.js"


import expressSession from 'express-session'
import MongoStore from 'connect-mongo'

//Mongo
//import ProductManagerM from './dao/mongoManager/productsModel.js';

init()

//se instancian las dependencias
const app = express ();

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log("Running on 8080"));
const socketServer = new Server(httpServer)
const productManager = new ProductManager();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Crear producto en la DB de Mongo
app.use("/mongo", routerProducts)
app.use('/home.handlebars', routerProducts) //ruta con handlebars
app.use("/carrito", routerCarts)



/*---------------------------------*/
app.use('/api/carts', cartsRouter)
//app.use('/home.handlebars', productRouter) //ruta con handlebars

app.use('/api', productRouter)



////Mongo Store

app.use(expressSession({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://Dante:Dante3284@cluster0.o6ehdpy.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: {},
      ttl: 20,
    }),
    secret:"asd",
    resave: false,
    saveUninitialized: false,
}))


app.use("/", routerSessions)



//VISTA CON WEBSOCKET!!
app.get('/realtimeproducts', (req, res) => {
    let products = productManager.getProducts();
    const scripts = { socket: '/socket.io/socket.io.js', index: '/js/index.js', products }
    //console.log(products);
    res.render('index2', scripts);
})

console.log(__dirname)

socketServer.on('connection', (socket) => {
    console.log('Usuario conectado')
    socket.emit('conectado', 'me conecto por socketServer')
    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })
})

console.log(socketServer.on)

