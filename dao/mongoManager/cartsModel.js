import mongoose from "mongoose";
import cartsModel from "../models/cartsSchema.js";


class cartsManagerM{
    static async createCarts(req, res){
        const {body} = req
        const result = await cartsModel.create(body)
        res.status(201).json(result)
    }
}

export default cartsManagerM