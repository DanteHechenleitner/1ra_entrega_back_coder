import express from 'express';
import productRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './dao/fileManager/api/productManager.js';

//MOCK, COMPRESSION Y ERROR
import routerMock from './mockingproducts/router/mockingproducts.js';
import compression from 'express-compression'
import MiddlewareError from './mockingproducts/utils/errors/MiddlewareError.js';


//MongoDB
import routerProducts from './routes/productsM.js';
import routerCarts from './routes/cartsM.js';

import { init } from './dao/mongoDB/mongoDB.js';

//import routerSessions from "./dao/mongoManager/indexSessions.js"
//import routerSessions from "./routes/sessions.js"
import routerLog from './routes/login.js';
import router from './dao/mongoManager/viewsSessions.js';
import authRouter from './routes/auth.js';
import routerViewUsers from './routes/indexUsers.js';
import Utils from './Utils/index.js';

//Usiarios admin-premium 3° entega
import routerUsers from './routes/usersDB.js';


import expressSession from 'express-session'
import MongoStore from 'connect-mongo'


///Se importa passport
import initPassport from './config/passportConfig.js';
import passport from 'passport';

/// Se importan las cookis

import cookieParser from 'cookie-parser'


///DotEnv
import { config } from 'dotenv';
config()

//Mongo
//import ProductManagerM from './dao/mongoManager/productsModel.js';

init()

//se instancian las dependencias
const app = express ();

const PORT = process.env.PORT_NODE || 3000;
const httpServer = app.listen(PORT, () => console.log("Running on " + PORT));
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
      mongoUrl: process.env.MONGO_URI, ///"mongodb+srv://Dante:Dante3284@cluster0.o6ehdpy.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: {},
      ttl: 20,
    }),
    secret:"asd",
    resave: false,
    saveUninitialized: false,
}))


/*----------COOKIE-----------------------*/
app.use(cookieParser())

/*----------PASSPORT--------------*/

initPassport()

app.use(passport.initialize())
app.use(passport.session())
//app.use("/", routerSessions)

app.use("/", router)
//app.use('/private', routerSessions)




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

//MOCKING, COMPRESSION Y ERROR
app.use(compression({
    brotli:{enabled: true, zlib:{}}
}))
app.use(MiddlewareError)
app.use('/', routerMock)
  
app.use((err, req, res, next) => {
    /* console.log(err) */
    res 
      .status(err.statusCode || 500)
      .json({success: false, message: err.message})
})
  
app.get('/loggerTest', (req, res) => {
   // req.logger.fatal('Esto fue un fatal')  LO COMENTO PQ POR MOMENTOS LO RECONOCE Y POR MOMENTOS NO
    req.logger.error('Esto fue un error')
    req.logger.warn('Esto fue un warn')
    req.logger.info('Esto fue un info')
    req.logger.http('Esto fue un http')
    req.logger.debug('Esto fue un debug')
    res.send('<h1>Hello world!</h1>')
})

/// probamos la ruras 3ra entrga
app.use("/DB", routerUsers)
app.use("/",authRouter)
app.use("/", routerLog)
//router.use('/', Utils.authJWTMiddleware(['admin']), routerViewUsers) //http://localhost:8080/users/management

