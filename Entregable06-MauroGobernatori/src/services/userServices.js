import UserDaoMongoDB from "../daos/userDao.js";
const userDao = new UserDaoMongoDB();

export default class UserServices {

  async register(user) {
    try{
      const userRegistered = await userDao.register(user);
      if(userRegistered){
        return userRegistered
      }else{
        throw new Error("User couldn't be registered");
      }
    }catch(error){
      throw new Error(error)
    }
  }

  async login(email, password) {
    try{
      const userLogin = await userDao.login(email, password);
      if(userLogin){
        return userLogin
      }else{
        throw new Error("User couldn't login");
      }
    }catch(error){
      throw new Error(error)
    }
  }
}
