import {validationResult} from 'express-validator/check';
import {auth} from './../services/index';
import {transSuccess} from './../../lang/vi';

let getLoginRegister =  (req, res) => {
    res.render('auth/master', {
        errors: req.flash('errors'),
        success: req.flash('success')
    });
};

let postRegister = async (req, res) => {
    let errorArr = [];
    let successArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        req.flash('errors', errorArr);
        res.redirect('/login-register');
    }

    try {
        let createUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password);
        successArr.push(createUserSuccess);
        req.flash('success', successArr);
        return res.redirect('login-register');
    } catch (err) {
        errorArr.push(err);
        req.flash('errors', errorArr);
        return res.redirect('/login-register');
    }
};  

let getLogout = (req, res) => {
    req.logout();  //Remove session passport user
    req.flash('success', transSuccess.logout_success);

    return res.redirect('login-register');
}

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login-register');
    }
    next();
}

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister,
    getLogout: getLogout,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut
};
