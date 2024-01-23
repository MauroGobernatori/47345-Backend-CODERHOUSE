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
            res.redirect('/api/views/products');
        }catch(error){

        }
    }
}