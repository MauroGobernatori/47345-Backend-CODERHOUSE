import  { productService }  from '../services/productService.js';

import { HttpResponse, errorsDictionary } from '../middlewares/httpResponse.js';
const httpResponse = new HttpResponse();

export default class ProductController{

    async createProduct(req, res, next){
        try{
            const { name, description, price, stock } = req.body
            const prod = {
                name: name, description: description, price: price, stock: stock
            }
            const newProduct = await productService.createProduct(prod)
            if(newProduct){
                res.redirect('/api/product_list');
            }else{
                return httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_PRODUCT);
            }
        }catch(error){
            next(error);
        }
    }

    async deletedProduct(req, res, next){
        try{
            const {id} = req.params;
            const { method } = req.query;
            if(method === 'delete'){
                const deletedProduct = await productService.deleteProduct(id);
                if(deletedProduct){
                    res.redirect('/api/product_list');    
                }else{
                    return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_PRODUCT);
                }
            }else{
                return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_PRODUCT);
            }
        }catch(error){
            next(error);
        }
    }

    async updateProduct(req, res, next){
        try{
            const { name, description, price, stock } = req.body;
            const { id } = req.params;
            const { method } = req.query;
            const prod = {
                name: name,
                description: description,
                price: price,
                stock: stock
            }
            if(method === 'put'){
                const updatedProduct = await productService.updateProduct(id, prod)
                if(updatedProduct){
                    res.redirect('/api/product_list');
                }else{
                    return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_PRODUCT);
                }
            }else{
                return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_PRODUCT);
            }
        }catch(error){
            next(error);
        }
    }
}