import { ProductModel } from './models/productModel.js';

export default class ProductDao{
    async getAll(){
        try{
            return await ProductModel.find().lean();
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            return await ProductModel.findById(id);
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

    async deleteProduct(id){
        try{
            return await ProductModel.findByIdAndDelete(id);        
        }catch(error){
            throw new Error(error)
        }
    }

    async updateProduct(id, prod){
        try{
            return await ProductModel.findByIdAndUpdate({ _id: id}, prod)
        }catch(error){
            throw new Error(error)
        }
    }
}