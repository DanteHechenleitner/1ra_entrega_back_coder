import express from "express"

import { uploader } from "../utils.js"

import cartsManagerM from "../dao/mongoManager/cartsModel.js"

const routerCarts = express.Router()
routerCarts.use(express.json())

//EN LAS RUTAS SIEMPRE /MONGO/...

routerCarts
.post('/carts',(req,res)=> {cartsManagerM.createCarts(req, res)})
.get('/:id', (req,res) => {cartsManagerM.getCarts(req, res)} )
.post('/post/carts', (req,res) => {cartsManagerM.addToCart(req, res)})
.put('/put/carts', (req,res) => {cartsManagerM.removeFromCart(req, res)} )
.delete('/carts/:cartId', (req,res) => {cartsManagerM.deleteCart(req, res)} )


export default routerCarts



/*
 { "products":
    {
      "product":"641c8e25052162d55aca5f29",
      "quantity":1
    }
 }*/


 /*   {
      "productId":"64205b0440e2c475c148ef69",
      "cartsId": "64208dcba03f65c13477b157"
    }
*/