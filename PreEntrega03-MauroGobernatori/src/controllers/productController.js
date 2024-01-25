import  ProductService  from '../services/productService.js';
const productService = new ProductService();

export default class ProductController{

    async createProduct(req, res, next){
        try{
            const { name, description, price, stock } = req.body
            const prod = {
                name: name, description: description, price: price, stock: stock
            }
            await productService.createProduct(prod)
            res.redirect('/api/product_list');
        }catch(error){

        }
    }

    async deletedProduct(req, res, next){
        try{
            const {id} = req.params;
            const { method } = req.query;
            if(method === 'delete'){
                await productService.deleteProduct(id);
            }
            res.redirect('/api/product_list');
        }catch(error){

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
                await productService.updateProduct(id, prod)
            }
            res.redirect('/api/product_list');
        }catch(error){

        }
    }
}