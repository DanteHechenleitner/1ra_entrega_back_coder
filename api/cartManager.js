import fs from 'fs';
import ProductManager from './productManager.js';
const productos = new ProductManager();


class CartManager {
    constructor() {
        this.carts = [];
        this.path = "./carts.json";
    }

    addCart = (cart) => {
        let id = this.carts.length + 1;
        cart.id = id;
        cart.products = [];
        this.carts.push(cart);

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.carts))
        } else {
            let contenido = fs.readFileSync(this.path, 'utf-8');
            let cts = JSON.parse(contenido);
            let id = cts.length + 1;
            cart.id = id
            cart.products = [];
            cts.push(cart);
            fs.writeFileSync(this.path, JSON.stringify(cts));
        }
        return this.carts;
    }

    getAll = async () => {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf8");
            const carts = JSON.parse(contenido);
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = (id) => {
        let contenido = fs.readFileSync(this.path, 'utf-8');
        let carts = JSON.parse(contenido);
        let cartById = carts.filter(elemento => elemento.id == id);
        return cartById [0];

    }

    addProductToCart = async (cid, pid) => {
        let cart = await this.getCartById(cid);
        let carts = await this.getAll();

        let cartPosition = carts.findIndex(element => element.id == cid);
        let product = await productos.getProductById(pid);

        cart.products.push(product[0]);
        carts[cartPosition] = cart;

        fs.writeFileSync(this.path, JSON.stringify(carts))

    }

};



export default CartManager;