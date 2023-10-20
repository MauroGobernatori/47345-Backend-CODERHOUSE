import express from "express";
import { ProductManager } from "./manager/productManager.js";
const productManager = new ProductManager('./products.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/products', async (req, res) => {
    try{
        const {limit} = req.query;
        if(!limit){
            const products = await productManager.getProducts();
            res.status(200).json(products);
        }else{
            const products = await productManager.getProducts();
            const productsLimit = products.slice(0, limit);
            res.status(200).json(productsLimit);
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

app.post('/products', async (req, res) => {
    try{
        const product = {...req.body};
        await productManager.createProduct(product);

        res.status(200).send('Product succesfully created!');
    }catch(error){
        res.status(500).json(error.message);
    }
});

app.get('/products/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if(!product){
            res.status(404).send('Product not found!');
        }else{
            res.status(200).json(product);
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

const PORT = '8082';

app.listen(PORT, ()=> console.log(`Server ok on port ${PORT}`) );