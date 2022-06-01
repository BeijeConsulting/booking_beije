import { decryptItem, encryptItem } from "../crypto/crypto"

function setLocalStorage(key, token) {
    const now = new Date();

    const item = {
        [key]: token,
        expire: now.getTime()
    }

    return localStorage.setItem(key, JSON.stringify(encryptItem(item)));
}

function getLocalStorage(key) {
    if (localStorage.getItem('token') === null) return null;

    const token = decryptItem(JSON.parse(localStorage.getItem(key)));

    return token[key];
}


function getLocalStorageCheckout(key) {
    if (localStorage.getItem('checkout') === null) return null;

    const checkout = decryptItem(JSON.parse(localStorage.getItem(key)));

    return checkout[key];
}


function removeLocalStorage(key) {
    return localStorage.removeItem(key);
}

export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    getLocalStorageCheckout
}