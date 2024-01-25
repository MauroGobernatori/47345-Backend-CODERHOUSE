import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

import CartService from './cartService.js';
const cartService = new CartService();

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
            const newCart = await cartService.createCart();
            if(newCart){
                const newUser = await userDao.register({...user, cart: newCart._id});
                if(newUser){
                    return newUser
                }else{
                    return false
                }
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

    async wipeCart(id){
        try{
            const user = await userDao.getById(id);
            if(user){
                const cartWiped = await cartService.wipeCart(user.cart)
                if(cartWiped){
                    return cartWiped
                }else{
                    return false
                }
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}