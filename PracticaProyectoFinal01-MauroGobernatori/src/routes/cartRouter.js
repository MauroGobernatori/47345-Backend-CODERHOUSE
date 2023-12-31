import { Router } from 'express';
const router = Router();

import * as controller from '../controllers/cartController.js';

router.get('/:cid', controller.getById);

router.post('/', controller.create);

router.post('/:cid/products/:pid', controller.fillCart);

export default router;