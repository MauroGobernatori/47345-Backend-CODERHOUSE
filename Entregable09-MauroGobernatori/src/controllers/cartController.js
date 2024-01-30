import { cartService } from "../services/cartService.js";

import { HttpResponse, errorsDictionary } from "../middlewares/httpResponse.js";
const httpResponse = new HttpResponse();

export default class CartController{
    async addItemToCart(req, res, next){
        try{
            const { cid, pid } = req.params;
            const { quantity } = req.query;
            const itemAdded = await cartService.addItemToCart(cid, pid, quantity);
            if(itemAdded){
                res.redirect('/api/product_list');   
            }else{
                return httpResponse.NotFound(res, errorsDictionary.ERROR_ADD_TO_CART);
            }
        }catch(error){
            next(error);
        }
    }

    async generateTicket(req, res, next){
        try{
            const { cid } = req.params;
            const { _id } = req.user;
            const response = await cartService.generateTicket(_id, cid);
            if(response){
                res.redirect(`/api/purchase/${response._id}`);
            }else{
                return httpResponse.NotFound(res, errorsDictionary.ERROR_PURCHASE);
            }
        }catch(error){
            next(error);
        }
    }
}