import express from "express"
import { uploader } from "../../utils.js"
import ProductManagerM from "../../dao/Controllers/productsmanagerDB.js"
import Utils from "../../Utils/index.js"

const routerProducts = express.Router()
routerProducts.use(express.json())

//EN LAS RUTAS SIEMPRE /MONGO/...
routerProducts
.post('/post',Utils.authJWTMiddleware(['admin','premium']),(req,res)=> {ProductManagerM.create(req, res)}) 
.get('/get', (req,res)=> {ProductManagerM.getAll(req, res)})
.get('/get/:id',Utils.authJWTMiddleware(['admin','premium']), (req,res)=> {ProductManagerM.getById(req, res)})
.put('/put/:id',Utils.authJWTMiddleware(['admin','premium']), (req,res)=> {ProductManagerM.updataById(req, res)}) 
.delete('/delete/:id',Utils.authJWTMiddleware(['admin','premium']), (req,res)=> {ProductManagerM.deleteById(req, res)}) 
.get('/:category', (req,res) => {ProductManagerM.filtroCategory(req, res)})
.get('/', (req,res) => {ProductManagerM.paginateM(req, res)})




export default routerProducts;