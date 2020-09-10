export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com",
    gender_incorrect: "Sai giới tính <-->",
    password_incorrect: "Mật khẩu phải từ 8 kí tự trở lên bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác",
    update_username: "Username nằm trong khoảng từ 3 -> 17 kí tự  và không được phép chứa kí tự đặt biệt",
    update_gender: "Oops ! Dữ liệu giới tính có vấn đề",
    update_address: "Địa chỉ giới hạn trong khoảng từ 3 -> 30 kí tự",
    update_phone:   "Số điện thoại bắt đầu từ 0, và giới hạn trong khoảng 10-11 chữ số",
    keyword_find_user: "Lỗi từ khóa tìm kiếm"
};

export const transErrors = {
    account_in_use: "Email đã tồn tại",
    account_removed: "Tài khoản đã bị xóa khỏi hệ thống",
    account_not_active: "Tài khoản đã được đăng kí nhưng chưa được active, vui lòng check mail và active tài khoản",
    login_failed: "Sai tài khoản hoặc mật khẩu !",
    server_error: "Có lỗi phía server",
    avatar_type : "Kiểu file không hợp lệ",
    avatar_size : "Kích thước ảnh quá lớn ! Tối đa cho phép 1MB",
    account_undefined: "Tài khoản không tồn tại ",
    user_current_password_failed: "Mật khẩu hiện tại không chính xác"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo. Vui lòng kiểm tra email để active tài khoản trước khi đăng nhập !`;
    },

    loginSuccess: (username) => {
        return `Xin chào ${username}. Chúc bạn một ngày tốt lành !`
    },

    logout_success: 'Đăng xuất thành công, hẹn gặp lại !',
    user_info_updated: 'Cập nhật thông tin người dùng thành công !',
    user_password_updated: "Cập nhật mật khẩu thành công !"
};
