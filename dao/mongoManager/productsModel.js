//import Product from "../models/productoSchema.js";

import ProductsModel from "../models/productoSchema.js";

import communsUtils from "../../communs.js"; 

class ProductManagerM {
    static async create(req, res) {
        const {body} = req
        const result = await ProductsModel.create(body)
        res.status(201).json(result)
    }

    static async getAll(req, res){
        const result = await ProductsModel.find().lean()
        //res.status(200).json(result)
        res.render('productosDB',{result})
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

    static async filtroCategory(req,res){
        const { params: {category}} = req;
        const result = await ProductsModel.aggregate([
            {  $match: {category: category}},
            {  $group: {
                _id: 1,
                productos: {$push: {name: "$name", price:"$price", stock: "$stock"}}
            }}
          ],
          
        )
       
        //res.status(200).json(result)
        res.render('productosDB', { result: result} );
        console.log(...result)
    }


    static async paginateM(req,res){
        const {query: {limit=1, page=1, sort}} = req;
        const options ={
            limit,
            page,
        }
        if(sort){
            options.sort= {price: sort}
        }
        const result = await ProductsModel.paginate({},options);
        //res.status(200).json(communsUtils.busResponds(result))
        res.render('productosDB', communsUtils.busResponds({...result}));
        console.log(communsUtils.busResponds({...result}))
        
    }
}

export default ProductManagerM


