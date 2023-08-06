import productoSchema from "./models/productoSchema.js";

class Products {
    static createProduct(product) {
        return productoSchema.create(product)
    }

    static getProducts() {
        return productoSchema.find()
    }

    static getProductById(id) {
        return productoSchema.findById(id)
    }

    static updateProductById(id, data) {
        return productoSchema.updateOne({_id: id}, {$set: data})
    }

    static deleteProductById(id) {
        return productoSchema.deleteOne({_id: id})
    }
}

export default Products