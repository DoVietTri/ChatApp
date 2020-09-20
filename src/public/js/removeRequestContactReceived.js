
function removeRequestContactReceived() {
    $('.user-remove-request-contact-received').unbind('click').on('click', function() {
        let targetId = $(this).data('uid');
        $.ajax({
            url: '/contact/remove-request-contact-received',
            type: 'delete',
            data: {uid: targetId},
            success: function(data) {
                if (data.success) {
                    //$('.noti_content').find(`div[data-uid=${user.id}]`).remove();//remove popup notification
                    //$('ul.list-notifications').find(`li>div[data-uid=${user.id}]`).parent().remove();  //remove modal notification
                    //decreaseNumberNotification('noti_counter', 1);

                    decreaseNumberNotification('noti_contact_counter', 1);
                    decreaseNumberNotifyContact('count-request-contact-received');

                    $('#request-contact-received').find(`li[data-uid=${targetId}]`).remove();
                    
                    //real time
                    socket.emit('remove-request-contact-received', {contactId: targetId});
                }
            }
        });
    });
}

socket.on('response-remove-request-contact-received', function(user) {

    console.log(user);
    $('#find-user').find(`div.user-remove-request-contact-sent[data-uid = ${user.id}]`).hide();
    $('#find-user').find(`div.user-add-new-contact[data-uid = ${user.id}]`).css('display', 'inline-block');          
    
    $('#request-contact-sent').find(`li[data-uid=${user.id}]`).remove();

    decreaseNumberNotifyContact('count-request-contact-sent');
    decreaseNumberNotification('noti_contact_counter', 1);
});

$(document).ready(function() {
    removeRequestContactReceived();
});
