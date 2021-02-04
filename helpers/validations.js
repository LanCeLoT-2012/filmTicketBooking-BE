const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validate sign up data
module.exports.validateSignUpData = (signUpData) => {
    const { email, password, confirmPassword, displayName } = signUpData;
    // Validate email
    if (email === "") {
        return {
            validate: false,
            error: "Email can not be blank !"
        }
    } else if (!emailRegEx.test(email)) {
        return {
            validate: false,
            error: "Email is not in correct form !"
        };
    }
    //Validate password
    if (password === "") {
        return {
            validate: false,
            error: "Password can not be blank !"
        };
    } else if (confirmPassword !== password) {
        return {
            validate: false,
            error: "Confirm password and password must be the same !"
        };
    }
    // Validate displayName
    if (displayName === "") {
        return {
            validate: false,
            error: "Display name can not be blank !"
        };
    } else if (displayName.length > 16) {
        return {
            validate: false,
            error: "Display name must be less than 16 charaters !"
        };
    } else {
        return {
            validate: true,
            error: null,
        }
    }
}