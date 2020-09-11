const { resolve, reject } = require("bluebird")
import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import _ from 'lodash';

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId];
        let contactByUser = await ContactModel.findAllByUser(currentUserId);
        contactByUser.forEach((contact) => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        });
        deprecatedUserIds = _.uniqBy(deprecatedUserIds);

        let users = await UserModel.findAllForContact(deprecatedUserIds, keyword);
        resolve(users);
    })
}

let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let contactExists = await ContactModel.checkExists(currentUserId, contactId);
        if (contactExists) {
            return reject(false);
        }
        let newContactItem = {
            userId: currentUserId,
            contactId: contactId
        }
        let newContact = await ContactModel.createNew(newContactItem);
        resolve(newContact);
    });
}

let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId);
        
        if (removeReq.result.n === 0) {
            return reject(false);
        }
        return resolve(true);
    });
}

module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContact: removeRequestContact
}
