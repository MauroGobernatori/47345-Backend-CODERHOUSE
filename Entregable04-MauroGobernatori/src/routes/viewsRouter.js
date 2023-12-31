import { Router } from "express";
const router = Router();

import { ProductManager } from '../managers/productManager.js';
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default router;