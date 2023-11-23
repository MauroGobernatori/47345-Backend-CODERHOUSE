import { Router } from 'express';
const router = Router();

import { CartManager } from '../managers/cartManager.js';
const cartManager = new CartManager('./src/data/carts.json');
import { ProductManager } from '../managers/productManager.js';
const productManager = new ProductManager('./src/data/products.json');

router.post('/', async (req, res) => {
    try{
        const cartCreated = await cartManager.createCart();
        res.status(200).json(cartCreated);
    }catch(error){
        res.status(500).json(error.message);
    }
});

router.get('/:cid', async (req, res) => {
    try{
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));
        if(cart){
            res.status(200).json(cart);
        }else{
            res.status(404).json({message: `Cart with id: ${cid} not found!`});
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params
        const productFound = await productManager.getProductById(Number(pid));
        if(productFound){
            const cartSaved = await cartManager.saveProductToCart(Number(cid), Number(pid));
            res.status(200).json(cartSaved);
        }else{
            res.status(404).json({message: `Product with id: ${pid} not found!`});
        }
    }catch(error){
        res.status(500).json(error.message);
    }
});

export default router;