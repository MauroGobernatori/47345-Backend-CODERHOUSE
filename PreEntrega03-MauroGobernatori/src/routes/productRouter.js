import { Router } from 'express';

import ProductController from '../controllers/productController.js';
const controller = new ProductController();

const router = Router();

router.post('/create', controller.createProduct);

router.post('/delete/:id', controller.deletedProduct);

router.post('/update/:id', controller.updateProduct);

export default router;