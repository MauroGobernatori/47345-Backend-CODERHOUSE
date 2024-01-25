import CartService from "../services/cartService.js";
const cartService = new CartService();

export default class CartController{
    async addItemToCart(req, res, next){
        try{
            const { cid, pid } = req.params;
            const { quantity } = req.query;
            const itemAdded = await cartService.addItemToCart(cid, pid, quantity);
            res.redirect('/api/product_list');
        }catch(error){
            
        }
    }
}