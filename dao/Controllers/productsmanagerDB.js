//import Product from "../models/productoSchema.js";

import ProductsSchema from "../models/productoSchema.js";
import communsUtils from "../../Utils/communs.js"; 
import Products from "../productsDao.js";
import Users from "../usersDao.js";
import emailService from "../../services/email.service.js";


class ProductManagerM {
    static async create(req, res) {
        const {body} = req
        
        /// Se verifica si el usuario es Premium
        const prmiumUser = req.user.role === "premium"

        /// Estableces si es es dueño del producto, es decir si lo ingreso ese usuario
        const owner = prmiumUser ? req.user.email : "admin"

        const producData = {
            ...body,
            owner: owner
        }
        const result = await Products.createProduct(body)
        res.status(201).json(result)
    }


    /// Funcion que llama a todos los productos
    static async getAll(req, res){
        const result = await Products.getProducts()
        res.status(200).json(result)
        //res.render('profile',{result})
        console.log(result)
    }

    /// Funcion que llama productos por ID
    static async getById(req, res) {
        const { params: { id } } = req

        // Validar si el usuario es Admin o Premium
        const admin = req.user.role === "admin";
        const premium = req.user.role === "premium"

        const result = await Products.getProductById(id)

        if (!(admin || (premium && product.owner === req.user.email))) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar este producto' });
        }

        if (!result) {
          return res.status(404).end()
        }
        res.status(200).json(result)
    }

    static async updataById(req, res){
        const id = req.params.id;
        const data = req.body;

        // Validar si el usuario es Admin o Premium
        const admin = req.user.role === "admin";
        const premium = req.user.role === "premium"

        const product = await Products.getProductById(id);
        if (!product) {
            console.log(product)
          return res.status(404).end();
        }

        /// Se verifica si el usuario tiene permisos para modificar los productos
        if (!(admin || (premium && product.owner === req.user.email))) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar este producto' });
        }
        await Products.updateProductById(id, data);
        res.status(204).end()
    }

    /// Funcion que elimina producto por ID

    static async deleteById(req,res){
        const {params: {id}} = req

        const admin = req.user.role === "admin"

        const product = await Products.getProductById(id);
        if (!product) {
          return res.status(404).end();
        }

        /// Solo se puede eliminar un producto si el Usuario es Admin o dueño del producto
        if (!(admin || product.owner === req.user.email)) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
        }

        let premium = null

        if (admin && product.owner !== 'admin') {
            try {
              premium = await Users.getUserPremium({ email: product.owner, role: 'premium' }).exec();
            } catch (error) {
              console.error('Error al buscar el usuario premium:', error);
            }
        }
        

        await Products.deleteProductById({_id: id})

        /// Funcion que envia un email al usuario Premium cuando se elimina un producto

        if (premium) {
            const subject = 'Producto eliminado';
            const html = `<p>Hola ${premium.first_name}!!,</p><p>Tu producto "${product.name}" ha sido eliminado por el administrador.</p>`;
            
            try {
              await emailService.sendEmail(premium.email, subject, html);
              console.log('Correo electrónico enviado al usuario premium.');
            } catch (error) {
              console.error('Error al enviar el correo electrónico:', error);
            }
        }       

        res.status(204).end()
    } 

    //Funcion que filtra los productos por categoria

    static async filtroCategory(req,res){
        const { params: {category}} = req;
        const result = await ProductsSchema.aggregate([
            {  $match: {category: category}},
            {  $group: {
                _id: 1,
                productos: {$push: {name: "$name", price:"$price", stock: "$stock"}}
            }}
          ],
          
        )
  
       
        //res.status(200).json(result)
        res.render('productos', ...result);
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
        const result = await ProductsSchema.paginate({},options);
        //res.status(200).json(communsUtils.busResponds(result))
        res.render('productosPaginado', (communsUtils.busResponds(result)));
        //console.log(communsUtils.busResponds(result))
        
    }
}

export default ProductManagerM


