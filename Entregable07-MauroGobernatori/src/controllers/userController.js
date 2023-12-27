import UserServices from "../services/userServices.js";
const userService = new UserServices();

export default class UserController {

  // async register(req, res, next) {
  //   try {
  //     const user = await userService.register(req.body);
  //     if (user){
  //       res.redirect('/login'); // Si el registro es exitoso, redirecciona a la pestaña para que realice el login
  //     }else{
  //       res.redirect('/error-register'); // Si el registro tiene un error, redirecciona a la pestaña de error con el registro
  //     }
  //   }catch (error){
  //     next(error);
  //   }
  // }

  // async login(req, res, next) {
  //   try {
  //     const {email, password} = req.body;
  //     const user = await userService.login(email, password);
  //     if (user) {
  //       req.session.email = email;
  //       req.session.password = password;
  //       res.redirect('/profile');
  //     } else{
  //       res.redirect('/error-login');
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // Esta función destruye la session que se creó
  async logout(req, res, next){
    try{
      req.session.destroy((err) => {
        if(!err){
          res.redirect('/logout');
        }else{
          res.json({ status: 'Error with logout', body: err });
        }
      })
    }catch(error){
      next(error);
    }
  }

  async registerResponse(req, res, next){
    try {
      res.redirect('/login');
    } catch (error) {
      res.redirect('/error-register');
    }
  }

  async loginResponse(req, res, next){
    try{
      res.redirect('/profile');
    }catch(error){
      res.redirect('/error-login');
    }
  }

  async githubResponse(req, res, next){
    try {
      res.redirect('/profile');
    } catch (error) {
      res.redirect('/error-login');
    }
  }
}