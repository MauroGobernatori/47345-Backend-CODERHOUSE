import * as service from '../services/productService.js';

export const getAll = async (req, res, next) => {
    try{
        const { limit, page, sort, query } = req.query;
        const response = await service.getAll(limit, page, sort, query);
        const next = response.hasNextPage ? `http://localhost:8080/users/all?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/users/all?page=${response.prevPage}` : null;
        res.json({
            payload: response.docs,
            info: {
                totalDocs: response.totalDocs,
                totalPages: response.totalPages,
                page: response.page,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                prev,
                next
            }
        });
    }catch(error){
        next(error.message);
    }
}

export const getById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const response = await service.getById(id);
        if(!response){
            res.status(404).json({ msg: "Product not found!"});
        }else{
            res.status(200).json(response);
        }
    }catch(error){
        next(error.message);
    }
}

export const create = async (req, res, next) => {
    try{
        const newProd = await service.create(req.body);
        if(!newProd){
            throw new Error("Product creation error!");
        }else{
            res.json({data: newProd});
        }
    }catch(error){
        next(error.message);
    }
}

export const update = async (req, res, next) => {
    try{
        const { id } = req.params;
        const prodUpd = await service.update(id, req.body);
        if(!prodUpd){
            res.status(404).json({ msg: 'Error with product update!'});
        }else{
            res.status(200).json(prodUpd);
        }
    }catch(error){
        next(error.message);
    }
}

export const remove = async (req, res, next) => {
    try{
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if(!prodDel){
            res.status(404).json({ msg: 'Error with product deletion!'});
        }else{
            res.status(200).json({ msg: `Product with id: ${id} deleted!`});
        }
    }catch(error){
        next(error.message);
    }
}