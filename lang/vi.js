export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com",
    gender_incorrect: "Sai giới tính <-->",
    password_incorrect: "Mật khẩu phải từ 8 kí tự trở lên bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác"
};

export const transErrors = {
    account_in_use: "Email đã tồn tại",
    account_removed: "Tài khoản đã bị xóa khỏi hệ thống",
    account_not_active: "Tài khoản đã được đăng kí nhưng chưa được active, vui lòng check mail và active tài khoản",
    login_failed: "Sai tài khoản hoặc mật khẩu !",
    server_error: "Có lỗi phía server"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo. Vui lòng kiểm tra email để active tài khoản trước khi đăng nhập !`;
    },

    loginSuccess: (username) => {
        return `Xin chào ${username}. Chúc bạn một ngày tốt lành !`
    },

    logout_success: 'Đăng xuất thành công, hẹn gặp lại !'
};
