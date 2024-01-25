import  ProductDao  from '../daos/productDao.js';
const productDao = new ProductDao();

export default class ProductService{
    async getAll(){
        try{
            return await productDao.getAll()
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            return await productDao.getById(id)
        }catch(error){
            throw new Error(error)
        }
    }

    async createProduct(prod){
        try{
            const product = await productDao.createProduct(prod);
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
            const deletedProduct = await productDao.deleteProduct(id);
            if(deletedProduct){
                return deletedProduct
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async updateProduct(id, prod){
        try{
            const updatedProduct = await productDao.updateProduct(id, prod)
            if(updatedProduct){
                return updatedProduct
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}