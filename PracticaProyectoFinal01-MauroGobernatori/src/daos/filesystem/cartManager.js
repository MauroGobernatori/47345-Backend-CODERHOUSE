import fs from "fs";

export class CartManager {
    constructor(path){
        this.path = path;
    }

    async #getMaxId(){
        const carts = await this.getCarts();
        let maxId = 0;
        carts.map((cart) => {
            if(cart.id > maxId){
                maxId = cart.id
            }
        });
        return maxId
    }

    async createCart(){
        try{
            const cart = {
                id: await this.#getMaxId() + 1,
                products: []
            };
            const carts = await this.getCarts();
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart
        }catch(error){
            console.log('createCart():', error);
        }
    }

    async getCarts(){
        try{
            if(fs.existsSync(this.path)){
                const cartsJSON = await fs.promises.readFile(this.path, 'utf8');
                const carts = JSON.parse(cartsJSON);
                return carts
            }else{
                return []
            }
        }catch(error){
            console.log('getCarts():', error);
        }
    }

    async getCartById(cid){
        try{
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === cid);
            if(cart){
                return cart
            }else{
                return false
            }
        }catch(error){
            console.log('getCartById():', error);
        }
    }

    async saveProductToCart(idCart, idProd){
        try{
            const carts = await this.getCarts();
            const cartFound = await this.getCartById(idCart);
            if(cartFound){
                const prodFound = cartFound.products.find(prod => prod.id === idProd);
                if(prodFound){
                    prodFound.quantity += 1;
                }else{
                    const product = {
                        id: idProd,
                        quantity: 1
                    };
                    cartFound.products.push(product);
                }
                const index = carts.findIndex(cart => cart.id === idCart);
                carts[index] = cartFound;
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                return cartFound
            }else{
                return {message: `Cart with id: ${idCart} not found!`}   
            }
        }catch(error){
            console.log('saveProductToCart():', error);
        }
    }
}