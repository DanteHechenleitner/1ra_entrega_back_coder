import cartsModel from "./models/cartsSchema.js"

class Carts {
    static createCart(cart) {
        return cartsModel.create(cart)
    }

    static getCarts() {
        return cartsModel.find().populate('products.product')
    }

    static getCartById(id) {
        return cartsModel.findById(id).populate('products.product')
    }

    static updateCartById(id, data) {
        return cartsModel.updateOne({_id: id}, {$set: data})
    }
    static deleteCartById(id) {
        return cartsModel.deleteOne({_id: id})
    }
}

export default Carts