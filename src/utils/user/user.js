import { decryptItem } from "../crypto/crypto";
import { getLocalStorage, removeLocalStorage } from "../localStorage/localStorage";

function logout() {
    if ((getLocalStorage('refreshToken')) !== null) {

        const refreshToken = decryptItem(JSON.parse(localStorage.getItem('refreshToken')));
    
        const now = new Date()
        if ((now.getTime() - refreshToken?.expire) > 14200000) {
            removeLocalStorage('token');
            removeLocalStorage('refreshToken');
        } else{
            return null;
        }   
    }
}

export {
    logout
}