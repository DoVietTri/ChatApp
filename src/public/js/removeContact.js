
function removeContact() {
    $('.user-remove-contact').unbind('click').on('click', function() {
        let targetId = $(this).data('uid');

        $.ajax({
            url: '/contact/remove-contact',
            type: 'delete',
            data: {uid: targetId},
            success: function(result) {
                if (result.success) {

                    decreaseNumberNotifyContact('count-contacts');
                    $('#contacts').find(`ul li[data-uid=${targetId}]`).remove();

                    //remove message 

                    socket.emit('remove-contact', {contactId: targetId});
                }
            }
        });
    });
}

socket.on('response-remove-contact', function(user) {
    
    $('#contacts').find(`li[data-uid=${user.id}]`).remove();
    decreaseNumberNotifyContact('count-contacts');
})

$(document).ready(function() {
    removeContact();
});

