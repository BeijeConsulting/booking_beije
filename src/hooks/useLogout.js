// utils
import { decryptItem } from "../utils/crypto/crypto";
import { getLocalStorage, removeLocalStorage } from "../utils/localStorage/localStorage";

// ducks
import { initToken } from "../redux/ducks/tokenDuck";
import { initUser } from "../redux/ducks/userDuck";
import { useDispatch } from "react-redux";

// modules
// import { useNavigate } from "react-router-dom";
// import { routes } from "../routes/routes";

function useLogout() {

    // const navigate = useNavigate();
    const dispatch = useDispatch();

   const logoutExpire =() => {
        if ((getLocalStorage('refreshToken')) !== null) {
    
            const refreshToken = decryptItem(JSON.parse(localStorage.getItem('refreshToken')));
    
            const now = new Date();
    
            if ((now.getTime() - refreshToken?.expire) > 14200000) {
                removeLocalStorage('token');
                removeLocalStorage('refreshToken');
                // navigate(routes.LAYOUT);
            } else {
                return null;
            }
        }
    }

    const logoutUser = () => {
        removeLocalStorage('token');
        removeLocalStorage('refreshToken');
        dispatch(initUser());
        dispatch(initToken());
        // navigate(routes.LAYOUT);
    }

    return { logoutExpire, logoutUser}
}

export default useLogout;