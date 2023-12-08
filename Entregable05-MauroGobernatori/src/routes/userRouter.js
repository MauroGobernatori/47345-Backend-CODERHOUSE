import { Router } from "express";
import UserController from "../controllers/userController.js";
const controller = new UserController();
import { validateLogin } from '../middlewares/validateLogin.js';

const router = Router();

router.post("/register", controller.register);
router.post("/login", validateLogin, controller.login);
router.post('/logout', controller.logout);

export default router;
