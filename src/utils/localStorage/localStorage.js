import { decryptItem, encryptItem } from "../crypto/crypto"

function setLocalStorage(key, token) {
    const now = new Date();

    const item = {
        token : token,
        expire: now.getTime()
    }

    return localStorage.setItem(key, JSON.stringify(encryptItem(item)));
}

function getLocalStorage(key) {
    if(localStorage.getItem('token') === null) return null;
    return decryptItem(JSON.parse(localStorage.getItem(key)));
}

function removeLocalStorage(key) {
    return localStorage.removeItem(key);
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
}