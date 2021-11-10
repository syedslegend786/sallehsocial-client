export const registerValidation = (data) => {
    const { fullname, username, email, password, cf_password } = data
    let error = {};
    if (!fullname) {
        error.fullname = 'fullname is required'
    } else if (fullname.length > 25) {
        error.fullname = 'no more than 25 character allowed!'
    }

    if (!username) {
        error.username = 'username is required'
    } else if (username.length > 25) {
        error.username = 'no more than 25 character allowed!'
    }

    if (!email) {
        error.email = 'email is required'
    } else if (!validateEmail(email)) {
        error.email = 'example@any.com required!'
    }

    if (!password) {
        error.password = 'password is required'
    } else if (password.length < 6) {
        error.password = 'atleast 6 digits required!'
    }

    if (!cf_password) {
        error.cf_password = 'confirm password required!'
    } else if (password !== cf_password) {
        error.cf_password = 'confirm password not matched!'
    }
    return error;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}