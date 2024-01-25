import CartDao from '../daos/cartDao.js';
const cartDao = new CartDao();

import ProductService from './productService.js';
const productService = new ProductService();

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

    async getById(id){
        try{
            const cart = await cartDao.getById(id);
            if(cart){
                return cart
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

    async getProductsOfCart(cid){
        try{
            const productsQuantity = [];
            const cart = await this.getById(cid);
            if(cart){
                for(const product of cart.products){
                    const fullProduct = await productService.getById(product.product_id);
                    const obj = {
                        product_id: fullProduct._id,
                        product_name: fullProduct.name,
                        price: (fullProduct.price * product.quantity),
                        quantity: product.quantity
                    };
                    productsQuantity.push(obj);
                }
                return productsQuantity
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}