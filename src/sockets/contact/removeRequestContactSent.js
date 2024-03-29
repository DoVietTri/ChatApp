import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from '../../helpers/socketHelper';
/**
 * @param io from socket.io lib
 */
let removeRequestContactSent = (io) => {
    let clients = {};
    io.on('connection', (socket) => {
        let currentUserId = socket.request.user._id;

        //push socket id to array
        clients = pushSocketIdToArray(clients, currentUserId, socket.id);

        socket.on('remove-request-contact-sent', (data) => {
            let currentUser = {
                id: socket.request.user._id
            };
            //emit notification
            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, 'response-remove-request-contact-sent', currentUser);
            }
        });

        socket.on('disconnect', () => {
            clients = removeSocketIdFromArray(clients, currentUserId, socket);
        });
        
    });
}

module.exports = removeRequestContactSent;
