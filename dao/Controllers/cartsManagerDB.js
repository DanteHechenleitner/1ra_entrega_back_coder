import mongoose from "mongoose";
import cartsModel from "../models/cartsSchema.js";
import Carts from "../cartsDao.js";
import Products from "../productsDao.js"


class cartsManagerM{
    // Funcioon que crea el carrito
    static async createCarts(req, res){
        const {body} = req
        const result = await Carts.createCart(body)
        res.status(201).json(result)
    }


    // Funcion que se encarga de traer todos los carritos
    static async getCarts(req,res){
        const {id} = req.params
        const result = await Carts.getCartById(id).populate('products.product').lean()
        //res.status(200).json(result)
        res.render('carts', { result });
        
    }


    //Funcion que se encarga de traer por ID
    static async getCartById(req, res) {
      const { params: { cid } } = req
      const result = await Carts.getCartById(cid).populate('products.product')
      if (!result) {
        return res.status(404).send("CART NOT FOUND")
      }
      res.status(200).json(result)
    }


    static async addToCart(req, res) {
        const { productId, cartsId } = req.body;
        const conetUser = req.user; // usuario conectado

        try {
            const cart = await Carts.getCartById(cartsId).populate("products.product");
            if (!cart) {
              return res.status(404).json({ message: "Carrito no encontrado" });
            }

            const product = await Products.getProductById(productId) // Producto por ID

            /// Se verifica si el Rol de usuario es el correcto
            const validRol = ["admin", "premium", "user"];

            if (!validRol.includes(conetUser.role)) {
              return res.status(403).json({ message: "Rol del usuario Invalido" });
            }

            if (
              conetUser.role === "premium" &&
              product.owner &&
              product.owner === conetUser.email
            ) {
              return res
                .status(403)
                .json({ message: "Los usuarios Premium no pueden agregar sus propios productos al carrito." });
            }

            if (cart.products && cart.products.length > 0) {
              const productIndex = cart.products.findIndex(
                (p) => p.product && p.product._id && p.product._id.toString() === productId
              );
              if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1;
              } else {
                cart.products.push({ product: productId});
              }
            } else {
              cart.products = [{ product: productId }];
            }
        
            await cart.save();
            return res.status(200).json(cart);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error en el servidor" });
        }
    }

    /// Se eleinia un producto del carrito

    static async removeFromCart(req, res) {
        const { productId, cartsId } = req.body;
      
        try {
          const cart = await Carts.getCartById(cartsId).populate("products.product");
          if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
          }
          const productIndex = cart.products.findIndex(
            (p) => p.product && p.product._id && p.product._id.toString() === productId
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

    // Se elimina carrito por ID 
    static async deleteCart(req, res) {
        const { cartId } = req.params;
    
        try {
            const result = await Carts.deleteCartById(cartId);
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
