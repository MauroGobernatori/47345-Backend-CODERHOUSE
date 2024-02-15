import  ProductDao  from '../daos/productDao.js';
const productDao = new ProductDao();

import ProductRepository from '../repository/productRepository.js';
const productRepository = new ProductRepository();

class ProductService{
    async getAll(){
        try{
            return await productDao.getAll()
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            // const prod = await productDao.getById(id);
            const prod = await productRepository.getProductById(id);
            if(prod){
                return prod
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async createProduct(prod, id, role){
        try{
            // const product = await productDao.createProduct(prod);
            if(role == 'premium'){
                prod = { ...prod, owner: id}
            }else{
                prod = { ...prod, owner: 'admin'}
            }

            const product = await productRepository.createProduct(prod);
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

    async createPRoductMock(cant=100){
        try{
            const products = await productDao.createPRoductMock(cant);
            if(products){
                return products
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export const productService = new ProductService();