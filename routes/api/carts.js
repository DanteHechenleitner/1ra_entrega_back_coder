import express from 'express';
import cartsManagerM from '../../dao/Controllers/cartsManagerDB.js';
import Utils from "../../Utils/index.js"

const cartsRouter = express.Router();
cartsRouter.use(express.json())
const cartManager = new cartsManagerM();

cartsRouter
.post('/post',Utils.authJWTMiddleware(['admin']),cartsManagerM.createCarts)
.get('/get/carts',cartsManagerM.getCarts)
.get('/get/:cid',Utils.authJWTMiddleware(['admin', 'user', 'premium']),cartsManagerM.getCartById)
.post('/post/:cid',Utils.authJWTMiddleware(['admin', 'user', 'premium']),cartsManagerM.addToCart)
.put('/put/:cid',Utils.authJWTMiddleware(['admin']),cartsManagerM.removeFromCart)
.delete('/delete/:cid',Utils.authJWTMiddleware(['admin']),cartsManagerM.deleteCart)


export default cartsRouter;