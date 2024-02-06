// Agregar clase general de controller, de donde UserController, ViewController y CartController van a heredar
import { userService } from '../services/userService.js';

import { HttpResponse, errorsDictionary } from '../middlewares/httpResponse.js';
const httpResponse = new HttpResponse();

export default class UserController {

    // Esta función destruye la session que se creó
    async logout(req, res, next){
        try{
            const { _id } = req.user
            await userService.wipeCart(_id)
            req.session.destroy((err) => {
                if(!err){
                    res.redirect('/api/logout');
                }else{
                    req.logger.fatal('Fatal error logging out');
                    return httpResponse.NotFound(res, errorsDictionary.ERROR_LOGOUT)
                    // res.json({ status: 'Error with logout', body: err });
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
            req.logger.error('Error with the registration!');
            res.redirect('/api/error-register');
        }
    }

    async loginResponse(req, res, next){
        try{
            res.cookie('token', req.user.access_token, {httpOnly: true}).redirect('/api/profile');
        }catch(error){
            req.logger.error('Error logging in!');
            res.redirect('/api/error-login');
        }
    }

    async githubResponse(req, res, next){
        try {
            res.redirect('/api/profile');
        } catch (error) {
            req.logger.error('Error with github login!');
            res.redirect('/api/error-login');
        }
    }
    
    async currentUser(req, res, next){
        try{
            console.log(req.user);
            res.redirect('/api/current');
        }catch(error){
            req.logger.error('Error showing current user!');
            res.redirect('/api/profile');
        }
    }
}