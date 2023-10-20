import fs from "fs";

export class ProductManager {
    constructor(path){
        this.path = path;
    }

    async #getMaxId(){
        const products = await this.getProducts();
        let maxId = 0;
        products.map(prod => {
            if(prod.id > maxId){
                maxId = prod.id;
            }
        })
        return maxId;
    }

    // async createProduct(obj){
    //     try{
    //         const product = {
    //             id: await this.#getMaxId() + 1,
    //             ...obj
    //         }
    //         const products = await this.getProducts();
    //         products.push(product);
    //         await fs.promises.writeFile(this.path, JSON.stringify(products));
    //         return product
    //     }catch(error){
    //         return error
    //     }
    // }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(productsJSON);
            }else{
                return [];
            }
        }catch(error){
            return error
        }
    }

    async getProductById(id){
        try{
            const products = await this.getProducts();
            const prod = products.find(prod => prod.id === id);
            if(!prod){
                return false
            }else{
                return prod
            }
        }catch(error){
            return error
        }
    }
}