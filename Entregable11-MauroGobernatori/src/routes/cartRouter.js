import { Router } from 'express';
import { authRoleUserPremium, authRoleUserNotOwner } from '../middlewares/authRole.js';

import CartController from "../controllers/cartController.js";
const controller = new CartController();

const router = Router();

router.put('/update_quantity/:cid/:pid', authRoleUserPremium, controller.updateQuantity);

router.put('/add_item/:cid/:pid', authRoleUserNotOwner, controller.addItemToCart);

router.post('/:cid/purchase', authRoleUserPremium, controller.generateTicket);

router.delete('/wipe/:cid', controller.wipeCart);

router.delete('/remove/:cid/:pid', controller.removeItemFromCart);

router.get('/:cid', controller.getCartById);

export default router;