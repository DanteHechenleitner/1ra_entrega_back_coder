//import Product from "../models/productoSchema.js";

import ProductsModel from "../models/productoSchema.js";

class ProductManagerM {
    static async create(req, res) {
        const {body} = req
        const result = await ProductsModel.create(body)
        res.status(201).json(result)
    }

    static async getAll(req, res){
        const result = await ProductsModel.find()
        res.status(200).json(result)
    }

    static async updataById(req, res){
        const {params: {id}, body} = req
        await ProductsModel.updateOne({_id: id}, {$set: body})
        res.status(204).end()
    }

    static async deleteById(req,res){
        const {params: {id}} = req
        await ProductsModel.deleteOne({_id: id})
        res.status(204).end()
    }

}

export default ProductManagerM