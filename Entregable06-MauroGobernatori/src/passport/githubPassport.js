import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

const strategyOptions = {
    callbackURL: "http://localhost:8080/users/github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email;
    const user = await userDao.getByEmail(email);
    if(user){
        return done(null, user);
    }else{
        const newUser = await userDao.register({
            first_name: profile._json.name,
            email,
            isGithub: true,
        });
        return done(null, newUser)
    }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
