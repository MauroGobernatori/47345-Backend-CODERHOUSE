import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { __dirname, mongoStoreOptions } from './utils.js';
import { errorHandler } from "./middlewares/errorHandler.js";

import { initMongoDB } from './db/connection.js';

import 'dotenv/config';

import MainRouter from './routes/mainRouter.js';

import passport from 'passport';
import './passport/localPassport.js';
import './passport/githubPassport.js';
import './passport/jwtPassport.js';

import { developmentLogger, productionLogger, addDevLogger, addProdLogger } from './utils.js';

const app = express();
const mainRouter = new MainRouter();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// -----------------------------------------------------  //
//              SETTING OF THE VIEWS                      //
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
// -----------------------------------------------------  //

app.use(cookieParser());

//     TABLE OF ACTIVE SESSIONS IN THE MONGO DATABASE     //
app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(addDevLogger);

app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

// -----------------------------------------------------  //
//  CONNECTION TO THE DATABASE AND RUNNING OF THE SERVER  //
// -----------------------------------------------------  //
const persistence = process.env.PERSISTENCE;

if(persistence == 'MONGO'){
    await initMongoDB();
}

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    developmentLogger.info(`Server running on port ${PORT}`);
    // console.log(`Server running on port ${PORT}`)
});