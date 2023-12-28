import { Router } from "express";
import UserController from "../controllers/userController.js";
const controller = new UserController();

// import { validateLogin } from '../middlewares/validateLogin.js';
import passport from 'passport';
// import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

/* Estos post son sin el passport (Preguntar duda)

// router.post("/register", passport.authenticate('register'), controller.register);
// router.post("/login", passport.authenticate('login'), controller.login);

// router.post("/login", validateLogin, controller.login); // No funciona validateLogin
*/

router.post("/register", passport.authenticate('register'), controller.registerResponse);
router.post("/login", passport.authenticate('login'), controller.loginResponse);

router.get('/register-github', passport.authenticate('github', { scope: ["user:email"] }));
router.get('/github', passport.authenticate('github', {
    failureRedirect: '/login', 
    successRedirect: '/profile', 
    passReqToCallback: true
}));

router.post('/logout', controller.logout);

router.get('/current', passport.authenticate('jwtCookies'), controller.currentUser);

// router.get('/private', verifyToken, (req, res) => {
//     const { first_name, last_name, email, role } = req.user;
//     res.json({
//         status: "success",
//         userData: {
//             first_name,
//             last_name,
//             email,
//             role,
//         },
//     });
// });

// router.get('/private2', passport.authenticate('jwtCookies'), (req, res) => {
//     res.send(req.user);
// });

export default router;