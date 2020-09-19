import mongoose from "mongoose";
import { notification } from "../services";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    senderId   : String,
    receiverId : String,
    type       : String,
    isRead     : {type: Boolean, default: false},
    createdAt  : {type: Number, default: Date.now}
});

NotificationSchema.statics = {
    /**
     * create new contact
     * @param {data} item 
     */
    createNew(item) {
        return this.create(item);
    },

    /**
     * remove notification
     * @param {string} senderId 
     * @param {string} receiverId 
     * @param {string} type 
     */
    removeRequestContactSentNotification(senderId, receiverId, type) {
        return this.remove({
            $and: [
                {'senderId'  : senderId},
                {'receiverId': receiverId},
                {'type'      : type}
            ]
        }).exec();
    },

    /**
     * get notification
     * @param {string} userId 
     * @param {integer} limit 
     */
    getByUserIdAndLimit(userId, limit) {
        return this.find({
            'receiverId': userId
        }).sort({
            'createdAt': -1
        }).limit(limit).exec();
    },

    /**
     * count all notification unread
     * @param {string} userId 
     */
    countNotifUnread(userId) {
        return this.count({
            $and: [
                {'receiverId': userId},
                {'isRead': false}
            ]
        }).exec();
    },

    /**
     * read more notification 10 item one time
     * @param {string} userId 
     * @param {number} skip 
     * @param {number} limit 
     */
    readMore(userId, skip, limit) {
        return this.find({
            'receiverId': userId
        }).sort({
            'createdAt': -1
        }).skip(skip).limit(limit).exec();
    },

    /**
     * mark notification as read
     * @param {string} userId 
     * @param {array} targetUsers 
     */
    markAllAsRead(userId, targetUsers) {
        return this.updateMany({
            $and: [
                {'receiverId': userId},
                {'senderId': {$in: targetUsers}}
            ]
        }, {
            'isRead': true
        }).exec();
    }
};

const NOTIFICATON_TYPE = {
    ADD_CONTACT: 'add_contact'
};

const NOTIFICATON_CONTENTS = {
    getContent: (notificationType, isRead, userId, username, userAvatar) => {
        if (notificationType === NOTIFICATON_TYPE.ADD_CONTACT) {
            if (!isRead) {
                return `<div class="notif-readed-false" data-uid="${ userId }">
                            <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
                            <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn !
                        </div>`;
            }
            return `<div data-uid="${ userId }">
                        <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
                        <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn !
                    </div>`;
        }

        return 'No matching with any notification type';
    }
}

module.exports = {
    model: mongoose.model('notification', NotificationSchema),
    types : NOTIFICATON_TYPE,
    contents: NOTIFICATON_CONTENTS
}
