import { response } from "express";
import UserServices from "../services/userServices.js";
const userService = new UserServices();

export default class UserController {

  async register(req, res, next) {
    try {
      const user = await userService.register(req.body);
      if (user){
        res.json({msg: 'User created!', user});
      }else{
        res.json({ msg: 'Error with user creation!'});
      }
    }catch (error){
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      if (user) {
        req.session.email = email;
        req.session.password = password;
        res.json({ msg: `Login succesfull with the user ${email}` })
      } else{
        res.json({ msg: 'Error with the login!' });
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next){
    try{
      req.session.destroy((err) => {
        if(!err){
          res.json({ msg: 'You have been logued out!' });
        }else{
          res.json({ status: 'Error with logout', body: err });
        }
      })
    }catch(error){
      next(error);
    }
  }
}
