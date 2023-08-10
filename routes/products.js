
import { Router } from 'express'
import ProductoSchema from '../dao/models/productoSchema.js';
import communsUtils from '../Utils/communs.js';

const routerProductVista = Router();

routerProductVista
.get('/total', async (req, res) => {
    const productos = await ProductoSchema.find().lean()
    console.log(productos)
    res.render('productos', { productos: productos })
})

.get('/:category', async (req, res) => {
    const { category } = req.params;
    const productos = await ProductoSchema.find({ category: category }).lean();
    res.render('productos', { productos: productos });
})
  
.get('/', async (req, res) => {
    const { query: { limit = 1, page = 1, sort } } = req;
    const options = {
      limit,
      page
    }
    if (sort) {
      options.sort = { price: sort }
    }
    const productos = await ProductoSchema.paginate({}, options)
    res.render('productosPaginado', communsUtils.busResponds(productos));
})



export default routerProductVista;

