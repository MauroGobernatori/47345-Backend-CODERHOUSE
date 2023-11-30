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

export const delCartProds = async (cid) => {
    try{
        const cartDel = await cartDao.delCartProds(cid);
        if(!cartDel){
            throw new Error('Cart deletion failed!');
        }else{
            return cartDel
        }
    }catch(error){
        console.log(error);
    }
}

export const delProd = async (cid, pid) => {
    try{
        const prodDel = await cartDao.delProd(cid, pid);
        if(!prodDel){
            throw new Error('Product deletion failed!');
        }else{
            return prodDel
        }
    }catch(error){
        console.log(error);
    }
}

export const cartUpdate = async (cid, obj) => {
    try{
        const cartUpdated = await cartDao.cartUpdate(cid, obj);
        if(!cartUpdated){
            throw new Error('Cart update failed!');
        }else{
            return cartUpdated
        }
    }catch(error){
        console.log(error);
    }
}

export const quantityUpdate = async (cid, pid, quantity) => {
    try{
        const quantityUpdated = await cartDao.quantityUpdate(cid, pid, quantity);
        if(!quantityUpdated){
            throw new Error('Quantity update failed!');
        }else{
            return quantityUpdated
        }
    }catch(error){
        console.log(error);
    }
}