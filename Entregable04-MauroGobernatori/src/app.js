import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from './utils.js';
import productRouter from "./routes/productRouter.js";
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';

import {ProductManager} from './managers/productManager.js';
const productManager = new ProductManager('./src/data/products.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`User connected: <${socket.id}>`);
    socket.on('disconnect', ()=> console.log(`User disconnected: <${socket.id}>`));

    socket.on('askProducts', async () => {
        const products = await productManager.getProducts();
        socket.emit('receiveProducts', products);
    });
});