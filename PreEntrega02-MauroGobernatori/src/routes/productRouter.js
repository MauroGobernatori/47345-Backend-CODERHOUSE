import { Router } from 'express';
const router = Router();

import { productValidator } from '../middlewares/productValidator.js';
import * as controller from '../controllers/productController.js';

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', productValidator, controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

export default router;