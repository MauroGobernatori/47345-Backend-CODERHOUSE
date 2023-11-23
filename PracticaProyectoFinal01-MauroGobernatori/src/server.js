import express from "express";
import morgan from "morgan";

import productRouter from "./routes/productRouter.js";
import cartRouter from './routes/cartRouter.js';

import { errorHandler } from './middlewares/errorHandler.js';

import { initMongoDB } from './daos/mongodb/connection.js';

const persistence = 'MONGO';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use(errorHandler);

if(persistence === 'MONGO') await initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));