import mongoose from "mongoose";
import cartsModel from "../models/cartsSchema.js";


class cartsManagerM{
    static async createCarts(req, res){
        const {body} = req
        const result = await cartsModel.create(body)
        res.status(201).json(result)
    }

    static async getCarts(req,res){
        const result = await cartsModel.find().populate('products.product')
        res.status(200).json(result)
    }


    static async addToCart(req, res) {
        const { productId, cartsId } = req.body;

        try {
            const cart = await cartsModel.findById(cartsId).populate("products.product");
            if (!cart) {
              return res.status(404).json({ message: "Carrito no encontrado" });
            }
            const productIndex = cart.products.findIndex(
              (p) => p.product._id.toString() === productId
            );
            if (productIndex >= 0) {
              cart.products[productIndex].quantity += 1;
            } else {
              cart.products.push({ product: productId });
            }
            await cart.save();
            return res.status(200).json(cart);
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    }

}  

     
    

export default cartsManagerM
