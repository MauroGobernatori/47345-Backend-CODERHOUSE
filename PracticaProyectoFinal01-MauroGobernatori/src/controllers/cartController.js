import * as service from '../services/cartService.js';

export const getById = async (req, res, next) => {
    try{
        const { cid } = req.params;
        const response = await service.getById(cid);
        if(!response){
            res.status(404).json({ msg: 'Cart not found!'});
        }else{
            res.status(200).json(response);
        }
    }catch(error){
        next(error.message)
    }
}

export const create = async (req, res, next) => {
    try{
        const newProd = await service.create();
        if(!newProd){
            res.status(404).json({ msg: 'Error with cart creation! '});
        }else{
            res.status(200).json(newProd);
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
            res.status(404).json({ msg: 'Error with cart filling! '});
        }else{
            res.status(200).json(fillCart);
        }
    }catch(error){
        next(error.message);
    }
}