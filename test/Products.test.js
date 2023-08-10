import mongoose from "mongoose";
import Products from "../dao/productsDao.js";
import Assert from 'assert';

mongoose.connect('mongodb+srv://Dante:Dante3284@cluster0.o6ehdpy.mongodb.net/ecommerce?retryWrites=true&w=majority')

const assert = Assert.strict;

describe('Pruebas al modulo de productos dao', function() {
    before(async function() {
        console.log('Pruebas Productos');
    });

    beforeEach(async function() {
         mongoose.connection.collections.products.drop();
    });

    after('[after]', function() {
        console.log('Despues de todas las pruebas');
    });
    
    afterEach('[afterEach]',function(){
        console.log('Despues de cada prueba');
    });

    it('Debe crear un producto', async function() {
        let result = await Products.createProduct({
            name: 'Ranger 260',
            price: 12000,
            code: 1,
            description: 'Motosoldadora',
            stock: 4,
            category: 'Motosoldadora'
        });
        assert.ok(result._id);
        assert.strictEqual(result.name, 'Ranger 260')
    });

    it('Debe retornar todos los productos', async function() {
        const result = await Products.getProducts();

    });

    it('Debe retornar todos los productos', async function() {
        const result = await Products.createProduct({
            name: 'Invertec 275TP',
            price: 3200,
            code: 2,
            description: 'Equipo',
            stock: 4,
            category: 'Invertec'
        });
        const product = await Products.getProductById(result._id);
        assert.strictEqual(typeof product, 'object');
        
    });

    it('Debe eliminar un producto por id', async function() {
        const result = await Products.createProduct({
            name: 'Ranger 260',
            price: 12000,
            code: 1,
            description: 'Motosoldadora',
            stock: 4,
            category: 'Motosoldadora'
        });
         await Products.deleteProductById(result._id);
     
    });

    it('Debe actualizar un producto por id', async function() {
        const result = await Products.createProduct({
            name: 'Ranger 260',
            price: 12000,
            code: 1,
            description: 'Motosoldadora',
            stock: 6,
            category: 'Motosoldadora'
        });

        const data = {
            name: 'Nuevo Producto',
            price: 500
        }

        await Products.updateProductById(result._id, data);

        const product = await  Products.getProductById(result._id);
        console.log(product);
         assert.ok(product._id);
         assert.strictEqual(typeof product, 'object');
         assert.strictEqual(product.name, data.name);
        
    });
} );