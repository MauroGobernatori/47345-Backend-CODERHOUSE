class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if((title || false) && (description || false) && (price > 0) && (thumbnail || false) && (stock > 0)){
            if(this.products.length > 0){
                this.products.forEach((product) => {
                    if(!Object.values(product).includes(code)){
                        const product = {
                            id: this.#getMaxId() + 1,
                            title,
                            description,
                            price,
                            thumbnail,
                            code,
                            stock
                        }
                        this.products.push(product);
                    }else{
                        console.log(`El código '${code}' ya está en uso.`);
                    }
                })
            }else{
                const product = {
                    id: this.#getMaxId() + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
                this.products.push(product);
            }
        }else{
            console.log('Uno de los campos es incorrecto.');
        }
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) => {
            if(product.id > maxId){
                maxId = product.id
            }
        })
        return maxId;
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        let found = false;
        let foundProduct;
        for(let i=0; i < this.products.length; i++){
            if(Object.values(this.products[i]).includes(id)){
                found = true;
                foundProduct = this.products[i];
                break;
            }
        }
        if(found){
            return foundProduct;
        }else{
            return `No se ha encontrado el producto con id '${id}'`;
        }
    }
}

const productManager = new ProductManager();

console.log('Productos:', productManager.getProducts());
console.log('-----------------------');

productManager.addProduct('Primero', 'Desc', 25, 'https', 'AA', 25);

console.log('Productos:', productManager.getProducts());
console.log('-----------------------');

productManager.addProduct('Primero', 'Desc', 25, 'https', 'AA', 25);

productManager.addProduct('Segundo', 'Descripcion del segundo', 240, 'https...', 'AB', 60);

console.log('Productos:', productManager.getProducts());
console.log('-----------------------');

console.log(productManager.getProductById(4));
console.log('-----------------------');

console.log(productManager.getProductById(2));