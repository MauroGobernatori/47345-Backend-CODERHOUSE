import { Router } from 'express';

import userRouter from './userRouter.js';
import viewRouter from './viewRouter.js';
// import cartRouter from './cartRouter.js';

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use('/users', userRouter);
        this.router.use('/', viewRouter);
    }

    getRouter() {
        return this.router;
    }
}