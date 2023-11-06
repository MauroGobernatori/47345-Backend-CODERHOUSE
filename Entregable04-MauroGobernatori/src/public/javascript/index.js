const socketClient = io();

const divProductsTable = document.getElementById('products-table');

socketClient.emit('askProducts');

socketClient.on('receiveProducts', (products) => {
    divProductsTable.innerHTML = fillTable(products);
});

socketClient.on('productRefresh', (product) => {
    console.log('Creado');
    socketClient.emit('askProducts');
});

function fillTable(products){
    let filledTable = '';
    filledTable = '';
    filledTable += `<div class="table">
    <div class="table-header">
        <div class="header__item">Title</div>
        <div class="header__item">Category</div>
        <div class="header__item">Description</div>
        <div class="header__item">Price</div>
        <div class="header__item">Stock</div>
        <div class="header__item">Code</div>
    </div>
    <div class="table-content">`
    products.forEach((prod) => {
        filledTable += `<div class="table-row">
        <div class="table-data">${prod.title}</div>
        <div class="table-data">${prod.category}</div>
        <div class="table-data">${prod.description}</div>
        <div class="table-data">${prod.price}</div>
        <div class="table-data">${prod.stock}</div>
        <div class="table-data">${prod.code}</div>
    </div>`
    });
    filledTable += `</div>
    </div>`;
    return filledTable;
}