import express from 'express';
import ProductManager from '../dao/fileManager/api/productManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();



productRouter.post('/', async (req, res) => {
    try {
        let product = req.body
        let products = await productManager.addProduct(product);
        res.send(product);
    } catch (error) {
        console.log(error);
    }
});

productRouter.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        res.render('index',
            {products} 
        )
    } catch (error) {
        console.log(error)
        res.send('Error')
    }
});

productRouter.get('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid)
    let saveId = await productManager.getProductById(pid);
    if (saveId){
        res.send(saveId)
    }else{
        res.send('Producto no encontrado')
    }
})

productRouter.put('/:pid', async (req, res) =>{
    let pid = parseInt(req.params.pid)
    let{campo, actualizacion} = req.body
   
    try {
        let newProduct = productManager.updateProductById(pid, campo, actualizacion);
        res.send("Producto Actualizado")
    } catch (error) {
        res.send("Producto no encontrado")
    }
})

productRouter.delete('/:pid', async (req, res) =>{
    let pid = parseInt(req.params.pid)
    try {
        let deleteById = productManager.deleteProduct(pid)
        res.send("Producto eliminado")
    } catch (error) {
        res.send('Producto no encontrado')
    }
})

export default productRouter;



/*
{ "name":"Ranger 260",
"price":6852,
"category":"Motosoldadora",
"code":01,
"description":"Motosoldadora",
"thumbnail":"Va foto",
"stock":5
}*/