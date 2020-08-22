import express from 'express';
import {auth, home} from './../controllers/index';

let router = express.Router();

/**
 * init all routes web
 * @param app from exactly express module
 */
let initRoutes = (app) => {

    router.get('/', home.getHome);  
    router.get('/login-register', auth.getLoginRegister);
    
    return app.use('/', router);
};

module.exports = initRoutes;
