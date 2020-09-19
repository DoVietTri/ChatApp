import {notification, contact} from './../services/index';

let getHome = async (req, res) => {
    //get notifications (5 item on time)
    let notifications  = await notification.getNotifications(req.user._id);

    //get amount notification unread
    let countNotifUnread = await notification.countNotifUnread(req.user._id);
    
    //get contacts (5 item on time)
    let contacts = await contact.getContacts(req.user._id);

    //count all contacts
    let countAllContacts = await contact.countAllContacts(req.user._id);

    //get contacts sent (5 item on time)
    let contactsSent = await contact.getContactsSent(req.user._id);

    //count all contacts sent
    let countAllContactsSent = await contact.countAllContactsSent(req.user._id);

    //get contacts received (5 item on time)
    let contactsReceived = await contact.getContactsReceived(req.user._id);

    //count all contacts received
    let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);
    
    res.render('main/home/home', {
        errors: req.flash('errors'),
        success: req.flash('success'),
        user  : req.user,
        notifications: notifications,
        countNotifUnread: countNotifUnread,
        contacts: contacts,
        contactsSent: contactsSent,
        contactsReceived: contactsReceived,
        countAllContacts: countAllContacts,
        countAllContactsSent: countAllContactsSent,
        countAllContactsReceived: countAllContactsReceived
    });
};

module.exports = {
    getHome: getHome
};
