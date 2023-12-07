import { UserModel } from "../models/userModel.js";

export default class UserServices {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async register(user) {
    try {
      const { email, password } = user;
      if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
        return await UserModel.create({ ...user, role: 'admin' });
      }
      const exists = await this.findByEmail(email);
      if (!exists){
        return await UserModel.create(user);
        return true
      }else{
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const userExist = await UserModel.findOne({ email, password });
      if (!userExist){
        return false;
      }else{
        return userExist;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
