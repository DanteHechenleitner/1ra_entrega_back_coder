import express from "express"

import { uploader } from "../utils.js"

import ProductManagerM from "../dao/mongoManager/productsModel.js"

const routerProducts = express.Router()
routerProducts.use(express.json())

//EN LAS RUTAS SIEMPRE /MONGO/...
//la ruta para postear en la db seria localhost:8080/mongo/api
routerProducts.post('/api', (req,res)=> {ProductManagerM.create(req, res)})



export default routerProducts;