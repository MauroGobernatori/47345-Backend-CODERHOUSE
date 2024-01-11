import { Router } from 'express';

import UserController from '../controllers/userController.js';
const controller = new UserController();

import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);

router.get('/register-github', passport.authenticate('github', { scope: ["user:email"] }));
router.get('/github', passport.authenticate('github', {
    failureRedirect: '/api/login', 
    successRedirect: '/api/profile', 
    passReqToCallback: true
}));

router.post('/logout', controller.logout);

router.get('/current', passport.authenticate('current'), controller.currentUser);

export default router;