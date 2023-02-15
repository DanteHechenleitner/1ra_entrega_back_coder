import express from 'express';
import productRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter)

const PORT = 8080;
app.listen(PORT, () =>  console.log("Running on 8080"));