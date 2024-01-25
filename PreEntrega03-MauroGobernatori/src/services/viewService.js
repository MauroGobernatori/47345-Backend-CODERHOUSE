import ProductService from "./productService.js";
const productService = new ProductService();

export default class ViewService{
    async getAllProducts(){
        try{
            const products = await productService.getAll();
            return products
        }catch(error){
            throw new Error(error)
        }
    }

    async getProductById(id){
        try{
            return await productService.getById(id)
        }catch(error){
            throw new Error(error)
        }
    }
}