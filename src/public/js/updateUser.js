
let userAvatar = null;
let userInfo = {};
let orginAvatarSrc = null;

function updateUserInfo()
{
    $('#input-change-avatar').bind('change', function() {
        let fileData = $(this).prop('files')[0];
        let math = ['image/png', 'image/jpg', 'image/jpeg'];
        let limit = 1048576;  // = 1 MB

        if ($.inArray(fileData.type, math) == -1) {
            alertify.notify('File không hợp lệ, vui lòng kiểm tra lại !', 'error', 7);
            $(this).val(null);
            return false;
        }

        if (fileData.size > limit) {
            alertify.notify('Kích thước ảnh quá lớn ! Tối đa cho phép 1MB', 'error', 7);
            $(this).val(null);
            return false;
        }
        
        if (typeof FileReader != undefined) {
            let imagePreview = $('#image-edit-profile');
            imagePreview.empty();

            let fileReader = new FileReader();
            fileReader.onload = function(element) {
                $('<img>', {
                    'src': element.target.result,
                    'class': 'avatar img-circle',
                    'id'    : 'user-modal-avatar',
                    'alt'  : 'avatar'
                }).appendTo(imagePreview);
            }

            imagePreview.show();
            fileReader.readAsDataURL(fileData);
            
            let formData = new FormData();
            formData.append('avatar', fileData);
            
            userAvatar = formData;
        } else {
            alertify.notify('Trình duyệt của bạn không hỗ trợ hiển thị ảnh !', 'error', 7)
        }
    });

    $('#input-change-username').bind('change', function() {
        userInfo.username = $(this).val();
    });

    $('#input-change-gender-male').bind('click', function() {
        userInfo.gender = $(this).val();
    });

    $('#input-change-gender-female').bind('click', function() {
        userInfo.gender = $(this).val();
    });

    $('#input-change-address').bind('change', function() {
        userInfo.address = $(this).val();
    });

    $('#input-change-phone').bind('change', function() {
        userInfo.phone = $(this).val();
    });

}

$(document).ready(function() {
    updateUserInfo();

    orginAvatarSrc = $('#user-modal-avatar').attr('src');

    $('#input-btn-update-user').bind('click', function() {
        if ($.isEmptyObject(userInfo) && !userAvatar) {
            alertify.notify('Bạn phải thay đổi thông tin trước khi cập nhật', 'error', 7);
            return false;
        }
        $.ajax({
            url: '/user/update-avatar',
            type: 'put',
            cache: false,
            contentType: false,
            processData: false,
            data: userAvatar, 
            success: function(result) {
                //Display success
                $('.user-modal-alert-success').find('span').text(result.message);
                $('.user-modal-alert-success').css('display', 'block');

                //Update avatar navbar
                $('#navbar-avatar').attr('src', result.imageSrc);

                //Update origin avatar
                orginAvatarSrc = result.imageSrc;

                //Reset
                $('.input-btn-cancle-update-user').click();
            },
            error: function(error) {          
                //Display errors
                $('.user-modal-alert-error').find('span').text(error.responseText);
                $('.user-modal-alert-error').css('display', 'block');

                //Reset
                $('.input-btn-cancle-update-user').click();
            }
        });
    });

    $('#input-btn-cancle-update-user').bind('click', function() {
        userAvatar = null;
        userInfo = {};
        $('#input-change-avatar').val(null);
        $('#user-modal-avatar').attr('src', orginAvatarSrc);
    });
});

