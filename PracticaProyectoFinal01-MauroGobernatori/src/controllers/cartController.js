import * as service from '../services/cartService.js';

// export const getAll = async (req, res, next) => {
//     try{
//         const response = await service.getAll();
//         res.status(200).json(response);
//     }catch(error){
//         next(error.message);
//     }
// }

export const getById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const response = await service.getById(id);
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