import { Router } from 'express';
import { authRoleAdminPremium, authRoleAdminOwner } from '../middlewares/authRole.js';

import ProductController from '../controllers/productController.js';
const controller = new ProductController();

const router = Router();

router.get('/products', controller.getAllProducts);
router.get('/product/:id', controller.getProductById);

router.post('/create', authRoleAdminPremium, controller.createProduct);

router.delete('/delete/:id', authRoleAdminOwner, controller.deletedProduct);

router.put('/update/:id', authRoleAdminOwner, controller.updateProduct);

export default router;