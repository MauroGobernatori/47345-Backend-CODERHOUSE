import  ProductDao  from '../daos/productDao.js';
const productDao = new ProductDao();

export default class ProductService{
    async getAll(){
        try{
            return await productDao.getAll();
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
}