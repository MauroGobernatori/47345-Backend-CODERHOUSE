// Ver si agregarlo mas tarde

import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    scope: ['profile', 'email'],
    state: true
}