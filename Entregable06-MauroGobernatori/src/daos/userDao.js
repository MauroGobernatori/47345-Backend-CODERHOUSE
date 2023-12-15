import { UserModel } from "../daos/models/userModel.js";
import { createHash, isValidPassword } from '../utils.js';

export default class UserDaoMongoDB {

    async getByEmail(email){
        try{
            const response = await UserModel.findOne({ email });
            if(response){
                return response
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            const user = await UserModel.findById(id);
            if(user){
                return user
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    // Realiza el registro del usuario
    async register(user){
        try {
            const { email, password } = user;
            const exists = await this.getByEmail(email);
            if (!exists){
                if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                    return await UserModel.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin'
                    });
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
            }else{
                return false;
            }
        }catch(error){
            throw new Error(error)
        }
    }

    // Chequea el email y contraseña en la base de datos para realizar el login del usuario
    async login(email, password){
        try{
            const userExist = await this.getByEmail(email);
            if (userExist){
                const isValid = isValidPassword(userExist, password);
                if(isValid){
                    return userExist
                }else{
                    return false
                }
            }else{
                return false;
            }
        }catch(error){
            throw new Error(error)
        }
    }
}