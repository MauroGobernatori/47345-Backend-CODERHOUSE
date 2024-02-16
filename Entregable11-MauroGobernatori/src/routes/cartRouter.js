import { Router } from 'express';
import { authRoleUser, authRoleUserNotOwner } from '../middlewares/authRole.js';

import CartController from "../controllers/cartController.js";
const controller = new CartController();

const router = Router();

router.post('/add_item/:cid/:pid', authRoleUserNotOwner, controller.addItemToCart);
router.get('/:cid/purchase', authRoleUser, controller.generateTicket);

export default router;