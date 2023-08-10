import express from 'express';
import path from 'path';
/// Rutas Back
import routerBack from './routes/api/indexApi.js';
/// Rutas Front
import routerFront from './routes/indexFront.js';

//MOCK, COMPRESSION Y ERROR
import routerMock from './mockingproducts/router/mockingproducts.js';
import compression from 'express-compression'
import MiddlewareError from './mockingproducts/utils/errors/MiddlewareError.js';


import { init } from './dao/mongoDB/mongoDB.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './dao/fileManager/api/productManager.js';

/// Se importan las cookis

import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

///Coneccion Mongo
import MongoStore from 'connect-mongo'


///Se importa passport
import initPassport from './config/passportConfig.js';
import passport from 'passport';
import Utils from './Utils/index.js';

// Se importa Logger
import { addLogger } from './Utils/logger.js'

//Se importa SWAGGER
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


///DotEnv
import { config } from 'dotenv';
config()

const PORT = process.env.PORT_NODE || 3000;
const MONGO_URI = process.env.MONGO_URI;

init()

//se instancian las dependencias
const app = express ();


////Mongo Store

app.use(expressSession({
    store: MongoStore.create({
      mongoUrl: MONGO_URI, ///"mongodb+srv://Dante:Dante3284@cluster0.o6ehdpy.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: {},
      ttl: 20,
    }),
    secret:"asd",
    resave: false,
    saveUninitialized: false,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views/layouts'))
app.use(express.static('public'))
app.use(cookieParser())


const httpServer = app.listen(PORT, () => console.log("Running on " + PORT));

//initS(httpServer)


const socketServer = new Server(httpServer)


const productManager = new ProductManager();

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

initPassport()
app.use(passport.initialize())

//SWAGGER CONFIG
const swaggerOptions = {
    definition : {
        openapi: '3.0.1',
        info: {
            title: 'Ecommerce Api',
            description: 'Ecommerce Api'
        },
    },
    apis:[path.join(__dirname,'.', 'docs','**','*.yaml')],
};
const specs = swaggerJSDoc(swaggerOptions);


///Rutas Back
app.use("/", routerBack)

///Ruras Front
app.use("/", routerFront)

//RUTAS SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


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




/*
//Crear producto en la DB de Mongo
app.use("/mongo", routerProducts)
app.use('/home.handlebars', routerProducts) //ruta con handlebars
app.use("/carrito", routerCarts)




app.use('/api/carts', cartsRouter)
//app.use('/home.handlebars', productRouter) //ruta con handlebars

app.use('/api', productRouter)


app.use(cookieParser())


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


  


/// probamos la ruras 3ra entrga
app.use("/DB", routerUsers)
app.use("/",authRouter)
app.use("/", routerLog)
//router.use('/', Utils.authJWTMiddleware(['admin']), routerViewUsers) //http://localhost:8080/users/management
*/
