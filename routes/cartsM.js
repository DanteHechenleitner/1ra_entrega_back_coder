import express from "express"

import { uploader } from "../utils.js"

import cartsManagerM from "../dao/mongoManager/cartsModel.js"

const routerCarts = express.Router()
routerCarts.use(express.json())

//EN LAS RUTAS SIEMPRE /MONGO/...

routerCarts
.post('/carts',(req,res)=> {cartsManagerM.createCarts(req, res)})
.get('/get/carts', (req,res) => {cartsManagerM.getCarts(req, res)} )


export default routerCarts