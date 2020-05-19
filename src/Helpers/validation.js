const validateUserName = (username) => {
    let regex = /^[0-9a-zA-Z]+$/;
    return username.match(regex);
}

const validatePassword = (password) => {
    return password.length >= 6
}

const validateName = (name) => {
    let regex = /^[a-zA-Z ]+$/;
    return name.match(regex);
}

export { validatePassword, validateUserName, validateName }