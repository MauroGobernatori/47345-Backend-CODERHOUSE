import fs from "fs";

export class ProductManager {
    constructor(path){
        this.path = path;
    }

    async #getMaxId(){
        const products = await this.getProducts();
        let maxId = 0;
        products.map(product => {
            if(product.id > maxId){
                maxId = product.id
            }
        });
        return maxId;
    }

    async createProduct(obj){
        try{
            const product = {
                id: await this.#getMaxId() + 1,
                status: true,
                ...obj
            };
            const products = await this.getProducts();
            const productCodeRepeated = products.find(prod => prod.code === obj.code);
            if(productCodeRepeated){
                return {message: 'Code is already in use!'}
            }else{
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return product
            }
        }catch (error){
            console.log('createProduct():', error);
        }
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf8');
                const products = JSON.parse(productsJSON);
                return products
            }else{
                return []
            }
        }catch (error){
            console.log('getProducts():',error);
        }
    }

    async getProductById(id){
        try{
            const products = await this.getProducts();
            const product = products.find(product => product.id === id);
            if(!product){
                return false
            }else{
                return product
            }
        }catch(error){
            console.log('getProductById():',error);
        }
    }

    async getProductsByLimit(limit){
        try{
            const products = await this.getProducts();
            if(!limit || limit >= products.length){
                return products
            }else{
                return products.slice(0, limit);
            }
        }catch(error){
            console.log('getProductsByLimit():',error);
        }
    }

    async updateProduct(obj, id){
        try{
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if(index === -1){
                return false
            }else{
                const productUpdate = {id, ...obj};
                products[index] = productUpdate;
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return productUpdate
            }
        }catch(error){
            console.log('updateProduct():',error);
        }
    }

    async deleteProduct(id){
        try{
            const products = await this.getProducts();
            const newProducts = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
        }catch(error){
            console.log(('deleteProduct():',error));
        }
    }
}