/**
 * Check if the mail is valid
 * @param {string} mail 
 * @returns {boolean} true if mail pass the regex test (domain and provider given)
 */
function checkMail(mail) {
  const reMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reMail.test(mail)
}

/**
 * Check if the password is valid
 * @param {string} password 
 * @returns {boolean} true if password pass the regex test (8 char and 1 special char)
 */
function checkPassword(password) {
    const rePassword = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&+=]).*$/;
    return rePassword.test(password)
}

export {
    checkMail,
    checkPassword
}