import ProductDaoMongoDB from '../daos/mongodb/productDao.js';
const prodDao = new ProductDaoMongoDB();

export const getAll = async (limit, page, sort, query) => {
    try{
        const all = await prodDao.getAll(limit, page, sort, query)
        if(!all){
            throw new Error("Products not found!");
        }else{
            return all
        }
    }catch(error){
        console.log(error);
    }
}

export const getAllByLimit = async (limiter) => {
    try{
        return await prodDao.getAllByLimit(limiter)
    }catch(error){
        console.log(error);
    }
}

export const getById = async (id) => {
    try{
        const prod = await prodDao.getById(id);
        if(!prod){
            return false
        }else{
            return prod
        }
    }catch(error){
        console.log(error);
    }
}

export const create = async (obj) => {
    try{
        const newProd = await prodDao.create(obj);
        if(!newProd){
            throw new Error("Product creation error!");
        }else{
            return newProd
        }
    }catch(error){
        console.log(error);
    }
}

export const update = async (id, obj) => {
    try{
        const prodUpd = await prodDao.update(id, obj);
        if(!prodUpd){
            return false
        }else{
            return prodUpd
        }
    }catch(error){
        console.log(error);
    }
}

export const remove = async (id) => {
    try{
        const prodDel = await prodDao.delete(id);
        if(!prodDel){
            return false
        }else{
            return prodDel
        }
    }catch(error){
        console.log(error);
    }
}