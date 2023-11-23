import { CartModel } from './models/cartModel.js';

export default class CartDaoMongoDB {
    // async getAll(){
    //     try{
    //         const response = await CartModel.find({});
    //         return response
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    async getById(id){
        try{
            const response = CartModel.findById(id);
            return response
        }catch(error){
            console.log(error);
        }
    }

    async create(){
        try{
            const obj = { products: [] };
            const response = await CartModel.create(obj);
            return response
        }catch(error){
            console.log(error);
        }
    }
}