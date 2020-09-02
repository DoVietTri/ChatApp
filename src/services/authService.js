import userModel from './../models/userModel';
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import {transErrors, transSuccess, transEmail, transMail} from './../../lang/vi';
import { reject, resolve } from 'bluebird';
import sendMail from './../config/mailer';

let saltRounds = 7;

let register = (email, gender, password, protocol, host) => {
    return new Promise(async (resolve, reject) => {
        let userByEmail = await userModel.findByEmail(email);

        if (userByEmail) {
            if (userByEmail.deletedAt != null) {
                return reject(transErrors.account_removed);
            }
            if (!userByEmail.local.isActive) {
                return reject(transErrors.account_not_active);
            } 
            return reject(transErrors.account_in_use);
        }

        let salt = bcrypt.genSaltSync(saltRounds);
        let userItem = {
            username: email.split('@')[0],
            gender  : gender,
            local   : {
                email   : email,
                password: bcrypt.hashSync(password, salt),
                verifyToken: uuidv4()
            }
        }
        let user = await userModel.createNew(userItem);
        let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`;

        //send mail
        sendMail(email, transMail.subject, transMail.template(linkVerify))
            .then((success) => {
                resolve(transSuccess.userCreated(user.local.email));
            })
            .catch(async (error) => {
                //remove user
                await userModel.removeById(user._id);
                console.log(error);
                reject(transMail.send_failed);
            });
    });
    
};

module.exports = {
    register: register
};
