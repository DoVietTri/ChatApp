import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId     : String,
    contactId  : String,
    status     : {type: Boolean, default: false},
    createdAt  : {type: Number, default: Date.now},
    updatedAt  : {type: Number, default: null},
    deletedAt  : {type: Number, default: null}
});

ContactSchema.statics = {
    /**
     * create new contact
     * @param {data} item 
     */
    createNew(item) {
        return this.create(item);
    },

    /**
     * find all items that related with user
     * @param {string} userId 
     */
    findAllByUser(userId) { 
        return this.find({
            $or: [
                {'userId': userId},
                {'contactId': userId}
            ]
        }).exec();
    },

    /**
     * Check exists of 2 user
     * @param {string} userId 
     * @param {string} contactId 
     */
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [
                {$and: [
                    {'userId': userId},
                    {'contactId': contactId}
                ]},
                {$and: [
                    {'userId': contactId},
                    {'contactId': userId}
                ]}
            ]
        }).exec();
    },

    /**
     * remove request contact 
     * @param {string} userId 
     * @param {string} contactId 
     */
    removeRequestContact(userId, contactId) {
        return this.remove({
            $and: [
                {'userId': userId},
                {'contactId': contactId}
            ]
        }).exec();
    },

    /**
     * get contact by userId (đã là bạn bè)
     * @param {string} userId 
     * @param {number} limit 
     */
    getContacts(userId, limit) {
        return this.find({
            $and: [
                {$or: [
                    {'userId': userId},
                    {'contactId': userId}
                ]},
                {'status': true}
            ]
        }).sort({
            'createdAt': -1
        }).limit(limit).exec();
    },

    /**
     * (đã gửi lời mời kết bạn nhưng chưa đồng ý)
     * @param {string} userId 
     * @param {number} limit 
     */
    getContactsSent(userId, limit) {
        return this.find({
            $and: [
                {'userId': userId},
                {'status': false}
            ]
        }).sort({
            'createdAt': -1
        }).limit(limit).exec();
    },

    /**
     * lời kết bạn nhận được từ người khác 
     * @param {string} userId 
     * @param {number} limit 
     */
    getContactsReceived(userId, limit) {
        return this.find({
            $and: [
                {'contactId': userId},
                {'status': false}
            ]
        }).sort({
            'createdAt': -1
        }).limit(limit).exec();
    },

    /**
     * count all contact
     * @param {string} userId 
     */
    countAllContacts(userId) {
        return this.count({
            $and: [
                {$or: [
                    {'userId': userId},
                    {'contactId': userId}
                ]},
                {'status': true}
            ]
        }).exec();
    },

    /**
     * count all contact sent
     * @param {string} userId 
     */
    countAllContactsSent(userId) {
        return this.count({
            $and: [
                {'userId': userId},
                {'status': false}
            ]
        }).exec();
    },

    /**
     * count all contact received
     * @param {string} userId 
     */
    countAllContactsReceived(userId) {
        return this.count({
            $and: [
                {'contactId': userId},
                {'status': false}
            ]
        }).exec();
    }

}

module.exports = mongoose.model('contact', ContactSchema);
