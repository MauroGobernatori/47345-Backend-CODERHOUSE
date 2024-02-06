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
                req.logger.debug(`Item added to cart successfully. ${itemAdded}`)
                res.redirect('/api/product_list');
            }else{
                req.logger.error('Adding item to cart error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_ADD_TO_CART);
            }
        }catch(error){
            req.logger.error('Error with adding item to cart function!');
            next(error);
        }
    }

    async generateTicket(req, res, next){
        try{
            const { cid } = req.params;
            const { _id } = req.user;
            const response = await cartService.generateTicket(_id, cid);
            if(response){
                req.logger.debug(`Ticket generated successfully.`)
                res.redirect(`/api/purchase/${response._id}`);
            }else{
                req.logger.error('Ticket generation error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_PURCHASE);
            }
        }catch(error){
            req.logger.error('Error with ticket generation function!');
            next(error);
        }
    }
}