import { ProductModel } from './models/productModel.js';

export default class ProductDao{
    async getAll(){
        try{
            return await ProductModel.find().lean();
        }catch(error){
            throw new Error(error)
        }
    }

    async createProduct(prod){
        try{
            const product = await ProductModel.create(prod)
            if(product){
                return product
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}