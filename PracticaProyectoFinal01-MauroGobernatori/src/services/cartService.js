import CartDaoMongoDB from '../daos/mongodb/cartDao.js';
const cartDao = new CartDaoMongoDB();

// export const getAll = async () => {
//     try{
//         return await cartDao.getAll();
//     }catch(error){
//         console.log(error);
//     }
// }

export const getById = async (id) => {
    try{
        const cart = await cartDao.getById(id);
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