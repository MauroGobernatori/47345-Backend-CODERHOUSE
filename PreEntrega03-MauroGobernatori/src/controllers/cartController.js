import { cartService } from "../services/cartService.js";

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

    async generateTicket(req, res, next){
        try{
            const { cid } = req.params;
            const { _id } = req.user;
            await cartService.generateTicket(_id, cid)
            
        }catch(error){
            
        }
    }
}