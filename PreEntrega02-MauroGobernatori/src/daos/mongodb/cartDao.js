import { CartModel } from './models/cartModel.js';

export default class CartDaoMongoDB {

    async getById(cid){
        try{
            const response = CartModel.findById(cid).populate('products');
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

    async fillCart(cid, pid, quantityAdd = 1){
        try{
            const cart = await this.getById(cid);
            const findProd = cart.products.find(el => el._id == pid);
            if(findProd){
                const response = await CartModel.updateOne({ _id: cid, products: { $elemMatch: { _id: pid }}}, { $inc: { "products.$.quantity": 1 }});
                return response
            }else{
                const obj = { _id: pid, quantity: quantityAdd }
                const response = await CartModel.updateOne({ _id: cid}, { $push: { products: obj }});
                return response
            }
        }catch(error){
            console.log(error);
        }
    }

    async delCartProds(cid){
        try{
            const response = await CartModel.updateOne({_id: cid}, { $set: { products: [] }});
            return response
        }catch(error){
            console.log(error);
        }
    }

    async delProd(cid, pid){
        try{
            const response = await CartModel.updateOne({ _id: cid }, {$pull: { products: { _id: pid } }});
            return response
        }catch(error){
            console.log(error);
        }
    }

    async cartUpdate(cid, obj){
        try{
            const response = await CartModel.updateOne({_id: cid}, { $set: { products: obj }});
            return response
        }catch(error){
            console.log(error);
        }
    }

    async quantityUpdate(cid, pid, newQuantity){
        try{
            const response = await CartModel.updateOne({ _id: cid ,  products: { $elemMatch: { _id: pid } }}, { $set: { "products.$.quantity": newQuantity }})
            return response
        }catch(error){
            console.log(error);
        }
    }
}