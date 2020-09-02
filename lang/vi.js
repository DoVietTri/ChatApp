export const transValidation = {
    email_incorrect: "Email phải có dạng example@gmail.com",
    gender_incorrect: "Sai giới tính <-->",
    password_incorrect: "Mật khẩu phải từ 8 kí tự trở lên bao gồm chữ hoa, chữ thường, chữ số và kí tự đặc biệt",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác"
};

export const transErrors = {
    account_in_use: "Email đã tồn tại",
    account_removed: "Tài khoản đã bị xóa khỏi hệ thống",
    account_not_active: "Tài khoản đã được đăng kí nhưng chưa được active, vui lòng check mail và active tài khoản"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo. Vui lòng kiểm tra email để active tài khoản trước khi đăng nhập !`;
    }
};

export const transMail = {
    subject : "App Chat: Xác nhận kích hoạt tài khoản.",
    template: (linkVerify) => {
        return `
            <h2>Bạn nhận được email này vì đã đăng kí tài khoản trên ứng dụng Chat App</h2>
            <h3>Vui lòng click vào link bên dưới để kích hoạt tài khoản</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu cho rằng email này là nhầm lẫn, hãy bỏ qua nó. Trân trọng</h4>
        `;
    },
    send_failed: "Có lỗi trong quá trình gửi email, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi để được hỗ trợ" 
}
