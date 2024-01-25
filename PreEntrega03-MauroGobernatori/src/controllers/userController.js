// Agregar clase general de controller, de donde UserController, ViewController y CartController van a heredar
import UserService from '../services/userService.js';
const service = new UserService();

export default class UserController {

    // Esta función destruye la session que se creó
    async logout(req, res, next){
        try{
            // console.log(req.user);
            const { _id } = req.user
            await service.wipeCart(_id)
            req.session.destroy((err) => {
                if(!err){
                    res.redirect('/api/logout');
                }else{
                    res.json({ status: 'Error with logout', body: err });
                }
            });
        }catch(error){
            next(error);
        }
    }

    async registerResponse(req, res, next){
        try{
            res.redirect('/api/login');
        }catch(error){
            res.redirect('/api/error-register');
        }
    }

    async loginResponse(req, res, next){
        try{
            res.cookie('token', req.user.access_token, {httpOnly: true}).redirect('/api/profile');
        }catch(error){
            res.redirect('/api/error-login');
        }
    }

    async githubResponse(req, res, next){
        try {
            res.redirect('/api/profile');
        } catch (error) {
            res.redirect('/api/error-login');
        }
    }
    
    async currentUser(req, res, next){
        try{
            console.log(req.user);
            res.redirect('/api/current');
        }catch(error){
            res.redirect('/api/profile');
        }
    }
}