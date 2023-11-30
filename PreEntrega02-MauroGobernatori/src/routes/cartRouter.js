import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/cartController.js';

router.get('/:cid', controller.getById);

router.post('/', controller.create);

router.post('/:cid/products/:pid', controller.fillCart);

router.delete('/:cid', controller.delCartProds);

router.delete('/:cid/products/:pid', controller.delProd);

router.put('/:cid', controller.cartUpdate);

router.put('/:cid/products/:pid', controller.quantityUpdate)

export default router;