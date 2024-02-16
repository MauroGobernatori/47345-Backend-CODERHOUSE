import { Router } from 'express';

import { sendEmail } from '../controllers/emailController.js';

const router = Router();

router.post('/reset-password', sendEmail);

export default router;