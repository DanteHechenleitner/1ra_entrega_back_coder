import mongoose from "mongoose";
import cartsModel from "../models/cartsSchema.js";


class cartsManagerM{
    static async createCarts(req, res){
        const {body} = req
        const result = await cartsModel.create(body)
        res.status(201).json(result)
    }

    static async getCarts(req,res){
        const result = await cartsModel.find().populate('product')
        res.status(200).json(result)
    }
}

export default cartsManagerM
