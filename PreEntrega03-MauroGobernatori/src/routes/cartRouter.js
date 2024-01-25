import { Router } from 'express';

import CartController from "../controllers/cartController.js";
const controller = new CartController();

const router = Router();

router.post('/add_item/:cid/:pid', controller.addItemToCart)

export default router;