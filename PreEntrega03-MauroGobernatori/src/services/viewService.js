import ProductService from "./productService.js";
const productService = new ProductService();

import CartService from "./cartService.js";
const cartService = new CartService();

export default class ViewService{
    async getAllProducts(){
        try{
            const products = await productService.getAll();
            return products
        }catch(error){
            throw new Error(error)
        }
    }

    async getProductById(id){
        try{
            return await productService.getById(id)
        }catch(error){
            throw new Error(error)
        }
    }

    // async getCartById(id){
    //     try{
    //         const cart = await cartService.getById(id);
    //         if(cart){
    //             return cart    
    //         }else{
    //             return false
    //         }
    //     }catch(error){
    //         throw new Error(error)
    //     }
    // }

    async getProductsOfCart(cid){
        try{
            const cart = await cartService.getProductsOfCart(cid);
            if(cart){
                return cart    
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}