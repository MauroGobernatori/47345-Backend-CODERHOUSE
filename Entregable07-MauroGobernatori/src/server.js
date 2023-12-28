import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middlewares/errorHandler.js";

import userRouter from './routes/userRouter.js';
import viewRouter from './routes/viewRouter.js';

import "./db/connection.js";

import handlebars from 'express-handlebars';
import { __dirname, mongoStoreOptions } from './utils.js';

import passport from 'passport';
import './passport/localPassport.js';
import './passport/githubPassport.js';
import './passport/jwtPassport.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);
app.use('/', viewRouter);

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));