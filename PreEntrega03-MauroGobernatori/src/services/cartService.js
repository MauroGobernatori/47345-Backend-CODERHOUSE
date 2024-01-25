import CartDao from '../daos/cartDao.js';
const cartDao = new CartDao();

export default class CartService{
    async createCart(){
        try{
            const newCart = await cartDao.createCart();
            if(newCart){
                return newCart
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async wipeCart(id){
        try{
            const cartWiped = await cartDao.wipeCart(id);
            if(cartWiped){
                return cartWiped
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async addItemToCart(cid, pid, quantity){
        try{
            const itemAdded = await cartDao.addItemToCart(cid, pid, quantity);
            if(itemAdded){
                return itemAdded
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}