import { ProductModel } from './models/productModel.js';

export default class ProductDaoMongoDB {

    async getAll(limit = 10, page = 1, sort = false, query = false){
        try{
            if(sort){
                const response = await ProductModel.paginate({}, {page, limit, sort: {price: sort}})
                return response
            }else{
                const response = await ProductModel.paginate({}, {page, limit})
                return response
            }
        }catch(error){
            console.log(error);
        }
    }

    async getById(id){
        try{
            const response = await ProductModel.findById(id);
            return response
        }catch(error){
            console.log(error);
        }
    }

    async create(obj){
        try{
            obj.status = true;
            const response = await ProductModel.create(obj);
            return response
        }catch(error){
            console.log(error);
        }
    }

    async update(id, obj){
        try{
            const response = await ProductModel.findByIdAndUpdate(id, obj, { new:true });
            return response
        }catch(error){
            console.log(error);
        }
    }

    async delete(id){
        try{
            const response = await ProductModel.findByIdAndDelete(id);
            return response
        }catch(error){
            console.log(error);
        }
    }
}