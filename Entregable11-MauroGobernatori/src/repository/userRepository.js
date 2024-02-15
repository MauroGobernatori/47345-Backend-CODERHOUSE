import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

import { UserResDTO, UserReqDTO } from '../dtos/userDto.js';

export default class UserRepository{
    async getUserById(id){
        try {
            const user = await userDao.getById(id);
            if(user){
                return new UserResDTO(user)
            }else{
                return false
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByEmail(email){
        try {
            const user = await userDao.getByEmail(email);
            if(user){
                return new UserResDTO(user)
            }else{
                return false
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}