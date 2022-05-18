import { decryptItem, encryptItem } from "../crypto/crypto"

function setLocalStorage(key, token) {
    return localStorage.setItem(key, JSON.stringify(encryptItem(token)));
}

function getLocalStorage(key) {
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