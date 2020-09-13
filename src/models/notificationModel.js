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
    removeRequestContactNotification(senderId, receiverId, type) {
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
    }
};

const NOTIFICATON_TYPE = {
    ADD_CONTACT: 'add_contact'
};

const NOTIFICATON_CONTENTS = {
    getContent: (notificationType, isRead, userId, username, userAvatar) => {
        if (notificationType === NOTIFICATON_TYPE.ADD_CONTACT) {
            if (!isRead) {
                return `<span class="notif-readed-false" data-uid="${ userId }">
                            <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
                            <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn !
                        </span><br><br>`;
            }
            return `<span data-uid="${ userId }">
                        <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
                        <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn !
                    </span><br><br>`;
        }

        return 'No matching with any notification type';
    }
}

module.exports = {
    model: mongoose.model('notification', NotificationSchema),
    types : NOTIFICATON_TYPE,
    contents: NOTIFICATON_CONTENTS
}
