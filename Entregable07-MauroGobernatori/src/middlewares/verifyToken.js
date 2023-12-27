import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../jwt/auth.js';
import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

export const verifyToken = async (req,res, next) => {
    try{
        // req.headers('Authorization');
        const authHeader = req.get('Authorization');
        if(!authHeader){
            res.status(401).json({ msg: 'Unauthorized' });
        }else{
            const token = authHeader.split(' ')[1]; // Para sacarle el 'Bearer' que se pone al principio del authHeader
            const decode = jwt.verify(token, PRIVATE_KEY);
            console.log('decode::', decode); // Esto es el payload
            const user = await userDao.getById(decode.userId);
            if(!user){
                res.status(401).json({ msg: 'Unauthorized' });
            }else{
                req.user = user;
                next();
            }
        }
    }catch(error){
        console.log(error);
    }
}