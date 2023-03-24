//import Product from "../models/productoSchema.js";

import ProductsModel from "../models/productoSchema.js";

class ProductManagerM {
    static async create(req, res) {
        const {body} = req
        const result = await ProductsModel.create(body)
        res.status(201).json(result)
    }
}

export default ProductManagerM