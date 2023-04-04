import mongoose from "mongoose";
import cartsModel from "../models/cartsSchema.js";


class cartsManagerM{
    static async createCarts(req, res){
        const {body} = req
        const result = await cartsModel.create(body)
        res.status(201).json(result)
    }

    static async getCarts(req,res){
        const {id} = req.params
        const result = await cartsModel.findById(id).populate('products.product').lean()
        //res.status(200).json(result)
        res.render('cartsDB', { result });
        
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

    static async removeFromCart(req, res) {
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
            cart.products[productIndex].quantity -= 1;
            if (cart.products[productIndex].quantity === 0) {
              cart.products.splice(productIndex, 1);
            }
            await cart.save();
            return res.status(200).json(cart);
          } else {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Error en el servidor" });
        }
    }

    static async deleteCart(req, res) {
        const { cartId } = req.params;
    
        try {
            const result = await cartsModel.findByIdAndDelete(cartId);
            if (!result) {
                return res.status(404).json({ message: "Carrito no encontrado" });
            }
            return res.status(200).json({ message: "Carrito eliminado exitosamente" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    }

}  

        

export default cartsManagerM
