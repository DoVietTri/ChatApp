
$(document).ready(function() {
    $('#link-read-more-contacts-sent').bind('click', function() {
        let skipNumber = $('#request-contact-sent').find('li').length;

        $('#link-read-more-contacts-sent').css('display', 'none');
        $('.read-more-contacts-sent-loader').css('display', 'inline-block');

        $.get(`/contact/read-more-contacts-sent?skipNumber=${skipNumber}`, function(newContactUsersSent) {
            if (!newContactUsersSent.length) {
                $('#link-read-more-contacts-sent').css('display', 'inline-block');
                $('.read-more-contacts-sent-loader').css('display', 'none');

                alertify.notify('Không còn bạn bè nào để xem nữa !', 'error', 7);
                return false;
            }
            newContactUsersSent.forEach(function(user) {
                $('#request-contact-sent').find('ul')
                    .append(`<li class="_contactList" data-uid="${user._id}">
                                <div class="contactPanel">
                                    <div class="user-avatar">
                                        <img src="images/users/${user.avatar}" alt="">
                                    </div>
                                    <div class="user-name">
                                        <p>
                                            ${user.username}
                                        </p>
                                    </div>
                                    <br>
                                    <div class="user-address">
                                        <span>&nbsp ${(user.address !== null) ? user.address : ''}</span>
                                    </div>
                                    <div class="user-remove-request-sent action-danger" data-uid="${user._id}">
                                        Hủy yêu cầu
                                    </div>
                                </div>
                            </li>`);
            });

            $('#link-read-more-contacts-sent').css('display', 'inline-block');
            $('.read-more-contacts-sent-loader').css('display', 'none');
        });
    });
});
