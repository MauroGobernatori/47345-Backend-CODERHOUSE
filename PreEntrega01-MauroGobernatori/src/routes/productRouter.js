import { Router } from 'express';
const router = Router();

import { productValidator } from '../middlewares/productValidator.js';
import { ProductManager } from '../managers/productManager.js';
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req,res) => {
    try{
        const { limit } = req.body;
        if(!limit){
            const products = await productManager.getProducts();
            res.status(200).json(products);
        }else{
            const productsLimit = await productManager.getProductsByLimit(limit);
            res.status(200).json(productsLimit);
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

router.get('/:pid', async (req,res) => {
    try{
        const { pid } = req.params; 
        const product = await productManager.getProductById(Number(pid));
        if(!product){
            res.status(404).json({message: `Product with id: ${pid} not found!`});
        }else{
            res.status(200).json(product);
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

router.post('/', productValidator, async (req, res) => {
    try{
        const productCreated = await productManager.createProduct(req.body);
        res.status(200).json(productCreated);
    }catch(error){
        res.status(500).json(error.message);
    }
});

router.put('/:pid', async (req, res) => {
    try{
        const product = {...req.body};
        const { pid } = req.params;
        const idNumber = Number(pid);
        const productFound = await productManager.getProductById(idNumber);
        if(!productFound){
            res.status(404).json({message: `Product with id: ${idNumber} not found!`});
        }else{
            const productUpdated = await productManager.updateProduct(product, idNumber);
            res.status(200).json(productUpdated);
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

router.delete('/:pid', async (req, res) => {
    try{
        const { pid } = req.params;
        const idNumber = Number(pid);
        const productFound = await productManager.getProductById(idNumber);
        if(!productFound){
            res.status(404).json({ message: `Product with id: ${idNumber} not found!`});
        }else{
            await productManager.deleteProduct(idNumber);
            res.status(200).json({ message: `Product with id: ${idNumber} deleted!`})
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

export default router;