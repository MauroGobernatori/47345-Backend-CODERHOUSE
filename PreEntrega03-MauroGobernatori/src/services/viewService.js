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
}