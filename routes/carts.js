import express from "express"

import { uploader } from "../utils.js"

import cartsSchema from "../dao/models/cartsSchema.js"

const routerCartsVista = express.Router()

//la ruta para llamar a un carrito con sus productos sería localhost:8080/carrito/:cid
routerCartsVista.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const cart = await cartsSchema.findById(id).populate('products.product').lean();
  
      if (!cart) {
        throw new Error(`CART ${id} NOT FOUND`);
      }
  
      res.render('carts', { cart: cart });
      console.log(JSON.stringify(cart, null, 2));
  
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
});
  

export default routerCartsVista

