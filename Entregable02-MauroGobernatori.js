const fs = require('fs');

class ProductManager {
    constructor(){
        this.path = './products.json'
    }

    async getMaxId(products){
        let maxId = 0;
        products.map((product) => {
            if(product.id > maxId){
                maxId = product.id;
            }
        })
        return maxId;
    }

    async addProduct(product){
        try{
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf8');
                const productsArr = JSON.parse(productsJSON);
                product.id = await this.getMaxId(productsArr) + 1;
                productsArr.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productsArr));
            }else{
                const products = [];
                product.id = 1;
                products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(products));
            }
        }catch(error){
            console.log('addProduct():', error);
        }
    }

    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path, 'utf8'));
            }else{
                return [];
            }
        }catch(error){
            console.log('getProducts():', error);
        }
    }

    async getProductById(id){
        try{
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf8');
                const productsArr = JSON.parse(productsJSON);
                const product = productsArr.find((element) => element.id == id );
                if(product){
                    return product;
                }else{
                    return 'No hay producto con ese id.';
                }
            }else{
                return 'No se encuentra el archivo.';
            }
        }catch(error){
            console.log('getProductById():', error);
        }
    }

    async updateProduct(id, ...info){
        try {
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf8');
                const productsArr = JSON.parse(productsJSON);
                const product = productsArr.find((element) => element.id == id);
                if(product){
                    if(info.length == 1){
                        const newProduct = info[0];
                        newProduct.id = id;
                        const index = productsArr.indexOf(product);
                        productsArr.splice(index, 1);
                        productsArr.push(newProduct);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsArr));
                    }else{
                        const newProduct = product;
                        for(let i = 0; i < info.length; i += 2){
                            if(!product[info[i]]){
                                console.log(`El producto no tiene la propiedad '${info[i]}'`);
                                return ;
                            }else{
                                newProduct[info[i]] = info[i+1];
                            }
                        }
                        const index = productsArr.indexOf(product);
                        productsArr.splice(index, 1);
                        productsArr.push(newProduct);
                        await fs.promises.writeFile(this.path, JSON.stringify(productsArr));
                    }
                }else{
                    return 'No hay producto con ese id.';
                }
            }else{
                console.log('No se encuentra el archivo');
            }
        } catch (error) {
            console.log('updateProduct():', error);
        }
    }

    async deleteProduct(id){
        try{
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf8');
                const productsArr = JSON.parse(productsJSON);
                const index = productsArr.indexOf(productsArr.find((element) => element.id == id));
                if(index > -1){
                    productsArr.pop(index, 1);
                    await fs.promises.writeFile(this.path, JSON.stringify(productsArr));
                }else{
                    console.log('No hay producto con ese id');
                }
            }else{
                console.log('No se encuentra el archivo');
            }
        }catch(error){
            console.log('deleteProduct():', error);
        }
    }
}

const productManager = new ProductManager();

const product_1 = {
    title: 'Celular',
    description: 'Celular Samsung 1',
    price: 50,
    thumbnail: 'https://asd.com',
    code: 'AAA001',
    stock: 25
}

const product_2 = {
    title: 'Teclado',
    description: 'Teclado Bueno',
    price: 25,
    thumbnail: 'https://asd.com',
    code: 'AAA002',
    stock: 30
}

const product_3 = {
    title: 'Celular 2.0',
    description: 'Celular Iphone 10000',
    price: 200,
    thumbnail: 'https://asd.com',
    code: 'AAA001',
    stock: 10
}

const test = async () => {
    await productManager.addProduct(product_1);
    await productManager.addProduct(product_2);
    console.log(await productManager.getProducts());
    console.log(await productManager.getProductById(5));
    await productManager.deleteProduct(2);
    console.log(await productManager.getProducts());
    await productManager.addProduct(product_2);
    await productManager.updateProduct(2, 'stock', 45, 'title', 'Super teclado');
    await productManager.updateProduct(1, product_3);
    console.log(await productManager.getProducts());
}

test();