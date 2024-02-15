import { Router } from 'express';
import { authRoleAdmin, authRoleAdminPremium } from '../middlewares/authRole.js';

import ProductController from '../controllers/productController.js';
const controller = new ProductController();

const router = Router();

router.post('/create', authRoleAdminPremium, controller.createProduct);

router.post('/delete/:id', authRoleAdmin, controller.deletedProduct);

router.post('/update/:id', authRoleAdmin, controller.updateProduct);

export default router;