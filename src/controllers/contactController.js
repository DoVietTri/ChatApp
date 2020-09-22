import {contact} from './../services/index';
import {validationResult} from 'express-validator/check';


let findUsersContact = async (req, res) => {
    let errorArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        
        errors.forEach(item => {
            errorArr.push(item.msg);
        });
        return res.status(500).send(errorArr);
    }
    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;
        
        let users = await contact.findUsersContact(currentUserId, keyword);
        return res.render('main/contact/sections/_findUsersContact', {users});
    } catch (error) {
        return res.status(500).send(error);
    }
}

let addNew = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;

        let newContact = await contact.addNew(currentUserId, contactId);
        return res.status(200).send({success: !!newContact});
    } catch (error) {   
        return res.status(500).send(error);
    }
}

let removeRequestContactSent = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let removeReq = await contact.removeRequestContactSent(currentUserId, contactId);
        return res.status(200).send({success: !!removeReq});
    } catch (error) {
        return res.status(500).send(error);
    }
}

let removeRequestContactReceived = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let removeReq = await contact.removeRequestContactReceived(currentUserId, contactId);
        return res.status(200).send({success: !!removeReq});
    } catch (error) {   
        return res.status(500).send(error);
    }
}

let readMoreContacts = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let skipNumberContacts = +(req.query.skipNumber);
        let newContactUsers = await contact.readMoreContacts(currentUserId, skipNumberContacts);
        return res.status(200).send(newContactUsers);
    } catch (error) {
        return res.status(500).send(error);
    }
}

let readMoreContactsSent = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let skipNumberContactsSent = + (req.query.skipNumber);
        let newContactSentUsers = await contact.readMoreContactsSent(currentUserId, skipNumberContactsSent);
        return res.status(200).send(newContactSentUsers);
    } catch (error) {
        return res.status(500).send(error);
    }
}

let readMoreContactsReceived = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let skipNumberContactsReceived = + (req.query.skipNumber);
        let newContactReceivedUsers = await contact.readMoreContactsReceived(currentUserId, skipNumberContactsReceived);
        return res.status(200).send(newContactReceivedUsers);
    } catch (error) {
        return res.status(500).send(error);
    }
}

let approveRequestContactReceived = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let contactId = req.body.uid;
        let approveReq = await contact.approveRequestContactReceived(currentUserId, contactId);
        return res.status(200).send({success: !!approveReq});
    } catch (error) {   
        return res.status(500).send(error);
    }
}

module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContactSent: removeRequestContactSent,
    readMoreContacts: readMoreContacts,
    readMoreContactsSent: readMoreContactsSent,
    readMoreContactsReceived: readMoreContactsReceived,
    removeRequestContactReceived: removeRequestContactReceived,
    approveRequestContactReceived: approveRequestContactReceived
}
