import { reject, resolve } from 'bluebird';
import NotificationModel from './../models/notificationModel'; 
import UserModel from './../models/userModel';

const LIMIT_NUMBER_TAKEN = 5;

/**
 * get Notification when f5 page
 * just 5 item on time
 * @param {string} currentUserId 
 */
let getNotifications = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, LIMIT_NUMBER_TAKEN);
            let getNotifContent = notifications.map(async (notification) => {
                let sender = await UserModel.getNormalUserDataById(notification.senderId);
                
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
            });
            resolve(await Promise.all(getNotifContent));
        } catch (error) {
            reject(error);
        }
    }); 
}

/**
 * count all notification unread
 * @param {string} currentUserId
 */
let countNotifUnread = (currentUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notificationsUnread = await NotificationModel.model.countNotifUnread(currentUserId);
            resolve(notificationsUnread);
        } catch (error) {
            reject(error);
        }
    }); 
}

/**
 * read more notification max 5 item one time
 * @param {string} currentUserId 
 * @param {number} skipNumberNotification 
 */
let readMore = (currentUserId, skipNumberNotification) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newNotifications = await NotificationModel.model.readMore(currentUserId, skipNumberNotification, LIMIT_NUMBER_TAKEN);
            let getNotifContent = newNotifications.map(async (notification) => {
                let sender = await UserModel.getNormalUserDataById(notification.senderId);
                
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
            });
            resolve(await Promise.all(getNotifContent));
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * mark all notification as read
 * @param {string} currentUserId 
 * @param {array} targetUsers 
 */
let markAllAsRead = (currentUserId, targetUsers) => {
    return new Promise(async (resolve, reject) => {
        try {
           await NotificationModel.model.markAllAsRead(currentUserId, targetUsers);
           resolve(true);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
    getNotifications: getNotifications,
    countNotifUnread: countNotifUnread,
    readMore: readMore,
    markAllAsRead: markAllAsRead
}
