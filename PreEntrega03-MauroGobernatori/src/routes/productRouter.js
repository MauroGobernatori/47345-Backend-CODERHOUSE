import { Router } from 'express';

import ProductController from '../controllers/productController.js';
const controller = new ProductController();

const router = Router();

router.post('/create', controller.createProduct);

export default router;