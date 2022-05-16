function setLocalStorage(token) {
    return localStorage.setItem('token', JSON.stringify(token));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('token'));
}

function removeLocalStorage() {
    return localStorage.removeItem('token');
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
}