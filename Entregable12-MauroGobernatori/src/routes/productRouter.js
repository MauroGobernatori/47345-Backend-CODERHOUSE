import { Router } from 'express';
import { authRoleAdminPremium, authRoleAdminOwner } from '../middlewares/authRole.js';

import ProductController from '../controllers/productController.js';
const controller = new ProductController();

const router = Router();

router.post('/create', authRoleAdminPremium, controller.createProduct);

router.post('/delete/:id', authRoleAdminOwner, controller.deletedProduct);

router.post('/update/:id', authRoleAdminOwner, controller.updateProduct);

export default router;