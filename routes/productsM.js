import express from "express"

import { uploader } from "../utils.js"

import ProductManagerM from "../dao/mongoManager/productsModel.js"

const routerProducts = express.Router()
routerProducts.use(express.json())

//EN LAS RUTAS SIEMPRE /MONGO/...
routerProducts
.post('/api', (req,res)=> {ProductManagerM.create(req, res)})
.get('/', (req,res) => {ProductManagerM.getAll(req, res)} )
.put('/:id', (req,res) => {ProductManagerM.updataById(req, res)})
.delete('/:id', (req,res) => {ProductManagerM.deleteById(req, res)})
.get('/get/:category', (req,res) => {ProductManagerM.filtroCategory(req, res)})
.get('/get/', (req,res) => {ProductManagerM.paginateM(req, res)})




export default routerProducts;