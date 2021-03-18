const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validate sign up data
module.exports.validateSignUpData = (signUpData) => {
    const { email, password, confirmPassword, displayName } = signUpData;
    // Validate email
    if (email === "") {
        return {
			validate: false,
			error: "Email không được để trống !",
		};
    } else if (!emailRegEx.test(email)) {
        return {
			validate: false,
			error: "Email không đúng định dạng !",
		};
    }
    //Validate password
    if (password === "") {
        return {
			validate: false,
			error: "Mật khẩu không được để trống !",
		};
    } else if (confirmPassword !== password) {
        return {
			validate: false,
			error: "Mật khẩu xác nhận và mật khẩu phải trùng nhau !",
		};
    }
    // Validate displayName
    if (displayName === "") {
        return {
			validate: false,
			error: "Tên hiển thị không được để trống !",
		};
    } else if (displayName.length > 16) {
        return {
			validate: false,
			error: "Tên hiển thị phải ít hơn 16 kí tự !",
		};
    } else {
        return {
            validate: true,
            error: null,
        }
    }
}