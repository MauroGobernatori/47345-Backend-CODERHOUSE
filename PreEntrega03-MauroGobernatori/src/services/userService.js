import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

export default class UserService{

    async getByEmail(email){
        try{
            return await userDao.getByEmail(email)
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            return await userDao.getById(id)
        }catch(error){
            throw new Error(error)
        }
    }

    async register(user){
        try{
            const newUser = await userDao.register(user);
            if(newUser){
                return newUser
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async login(email, password){
        try{
            const userExists = await userDao.login(email, password);
            if(userExists){
                return userExists
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}