import { Router } from 'express';

import userRouter from './userRouter.js';
import viewRouter from './viewRouter.js';
// import cartRouter from './cartRouter.js';
import productRouter from './productRouter.js';

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use('/users', userRouter);
        this.router.use('/views', viewRouter);
        this.router.use('/products', productRouter);
    }

    getRouter() {
        return this.router;
    }
}