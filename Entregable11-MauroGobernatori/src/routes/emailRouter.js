import { Router } from 'express';

import { sendEmail, newPassword } from '../controllers/emailController.js';
// import UserController from '../controllers/userController.js';
// const userController = new UserController();

const router = Router();

router.post('/reset-password', sendEmail);

router.post('/new-password', newPassword)

export default router;