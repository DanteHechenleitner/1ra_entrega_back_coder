import express from 'express';
import CartManager from '../api/cartManager.js';

const cartsRouter = express.Router();
const cartManager = new CartManager();

cartsRouter.post('/', async(req,res) =>{
    let cart = req.body;
    let carts = await cartManager.addCart(cart);
    res.send(carts);

})

cartsRouter.post('/:cid/product/:pid', async(req, res) =>{
let cid = parseInt(req.params.cid);
let pid = parseInt(req.params.pid);
let cto = await cartManager.addProductToCart(cid, pid);
res.send('Producto agregado')
})

cartsRouter.get('/:id', async(req,res) =>{
    let ud = req.params.id;
    let carts = await cartManager.getCartById(id)
    res.send(carts)
}
)

export default cartsRouter;