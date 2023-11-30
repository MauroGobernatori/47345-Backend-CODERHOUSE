import * as service from '../services/cartService.js';

export const getById = async (req, res, next) => {
    try{
        const { cid } = req.params;
        const response = await service.getById(cid);
        if(!response){
            throw new Error('Cart finding failed!');
        }else{
            res.json(response);
        }
    }catch(error){
        next(error.message)
    }
}

export const create = async (req, res, next) => {
    try{
        const newCart = await service.create();
        if(!newCart){
            throw new Error('Cart creation failed!');
        }else{
            res.json(newCart);
        }
    }catch(error){
        next(error.message)
    }
}

export const fillCart = async (req, res, next) => {
    try{
        const { cid, pid, quantity } = req.params;
        const fillCart = await service.fillCart(cid, pid, quantity);
        if(!fillCart){
            throw new Error('Cart filling failed!');
        }else{
            res.json({ msg: 'Cart filled succesfully! '});
        }
    }catch(error){
        next(error.message);
    }
}

export const delCartProds = async (req, res, next) => {
    try{
        const { cid } = req.params;
        const cartDel = await service.delCartProds(cid);
        if(!cartDel){
            throw new Error('Cart deletion failed!');
        }else{
            res.json({ msg: 'Cart deleted succesfully!' });
        }
    }catch(error){
        next(error.message);
    }
}

export const delProd = async (req, res, next) => {
    try{
        const { cid, pid } = req.params;
        const prodDel = await service.delProd(cid, pid);
        if(!prodDel){
            throw new Error('Product deletion failed!');
        }else{
            res.json({ msg: 'Product deleted from cart succesfully!' });
        }
    }catch(error){
        next(error.message);
    }
}

export const cartUpdate = async (req, res, next) => {
    try{
        const { cid } = req.params;
        const obj = [ ...req.body];
        const cartUpdated = await service.cartUpdate(cid, obj);
        if(!cartUpdated){
            throw new Error('Cart update failed!');
        }else{
            res.json({ msg: 'Cart update succesfull!'});
        }
    }catch(error){
        next(error.message);
    }
}

export const quantityUpdate = async (req, res, next) => {
    try{
        const { cid, pid } = req.params;
        const quantity = req.body.quantity;
        const quantityUpdated = await service.quantityUpdate(cid, pid, quantity);
        if(!quantityUpdated){
            throw new Error('Quantity update failed!');
        }else{
            res.json({ msg: 'Quantity update succesfull!' });
        }
    }catch(error){
        next(error.meggage);
    }
}