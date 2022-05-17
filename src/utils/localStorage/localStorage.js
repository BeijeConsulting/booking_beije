function setLocalStorage(key, token) {
    return localStorage.setItem(key, JSON.stringify(token));
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function removeLocalStorage(key) {
    return localStorage.removeItem(key);
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
}