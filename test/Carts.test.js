import chai from 'chai';
import mongoose from 'mongoose';

import Carts from '../dao/cartsDao.js';
import Products from '../dao/productsDao.js';


const expect = chai.expect;

mongoose.connect('mongodb+srv://Dante:Dante3284@cluster0.o6ehdpy.mongodb.net/ecommerce?retryWrites=true&w=majority')

describe('Pruebas al modulo Cart dao', function () {
    before(function() {
        console.log('Pruebas de Carritos');
    });

    
    beforeEach(async function() {
        mongoose.connection.collections.carts.drop();
   });

   after(() => {
});

afterEach(() => {});

it('Debe crear un carrito de forma exitosa', async function() {
    const cart = await Carts.createCart({products: []})

    expect(cart).to.be.have.property('_id');
    expect(cart).to.be.have.property('products');
    expect(Array.isArray(cart.products)).to.be.ok;
    expect(cart.products).to.be.deep.equal([]);
    
    
});

it('Debe obtener los carritos', async function() {
    const carts = await Carts.getCarts();
    expect(Array.isArray(carts)).to.be.equal(true)
    expect(Array.isArray(carts)).to.be.ok
});

it('Borrar un carrito de forma exitosa', async function() {
    const cart = await Carts.createCart({products: []})

    await Carts.deleteCartById(cart._id)
    
    
    expect(cart.products).to.have.lengthOf(0)
});



});