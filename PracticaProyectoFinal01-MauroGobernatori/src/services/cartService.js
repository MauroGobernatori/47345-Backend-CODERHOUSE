import CartDaoMongoDB from '../daos/mongodb/cartDao.js';
const cartDao = new CartDaoMongoDB();

export const getById = async (cid) => {
    try{
        const cart = await cartDao.getById(cid);
        if(!cart){
            return false
        }else{
            return cart
        }
    }catch(error){
        console.log(error);
    }
}

export const create = async () => {
    try{
        const newCart = await cartDao.create();
        if(!newCart){
            return false
        }else{
            return newCart
        }
    }catch(error){
        console.log(error);
    }
}

export const fillCart = async (cid, pid, quantity) => {
    try{
        const fillCart = await cartDao.fillCart(cid, pid, quantity);
        return fillCart
    }catch(error){
        console.log(error);
    }
}