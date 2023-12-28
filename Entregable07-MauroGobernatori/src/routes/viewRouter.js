import { Router } from 'express';
import { login, register, errorLogin, errorRegister, profile, logout, current } from '../controllers/viewController.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get('/login', login);
router.get('/register', register);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', isAuth, profile);
router.get('/logout', logout);

router.get('/current', current);

export default router;