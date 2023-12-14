import { Router } from "express";
import UserController from "../controllers/userController.js";
const controller = new UserController();

// import { validateLogin } from '../middlewares/validateLogin.js';
import passport from 'passport';

const router = Router();

/* Estos post son sin el passport (Preguntar duda)

// router.post("/register", passport.authenticate('register'), controller.register);
// router.post("/login", passport.authenticate('login'), controller.login);

// router.post("/login", validateLogin, controller.login); // No funciona validateLogin
*/

router.post("/register", passport.authenticate('register'), controller.registerResponse);
router.post("/login", passport.authenticate('login'), controller.loginResponse);

router.get('/register-github', passport.authenticate('github', { scope: ["user:email"] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), controller.githubResponse);

router.post('/logout', controller.logout);

export default router;