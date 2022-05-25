import { Components } from 'antd/lib/date-picker/generatePicker';
import { setToken } from '../redux/ducks/tokenDuck';
import { setUser } from '../redux/ducks/userDuck';
import { signInPostApi } from '../services/api/auth/authApi';
import { decryptItem } from '../utils/crypto/crypto';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage/localStorage';

export class useUSer extends Components {



     user = {
        email: props.userDuck.user.email,
        password: props.userDuck.user.password
    }

    if((getLocalStorage('refreshToken')) === null) {
    return null
}


login = () => {
    if (Object.keys(props.userDuck.user).length !== 0) {
        signInPostApi(user, getLocalStorage('token')).then(res => {
            setLocalStorage("token", res?.data?.token);
            setLocalStorage("refreshToken", res?.data?.refreshToken);
            props.dispatch(setToken(res?.data?.token));
            props.dispatch(setUser())
        })
    }
}

const logout = () => {
    if ((getLocalStorage('refreshToken')) !== null) {

        const refreshToken = decryptItem(JSON.parse(localStorage.getItem('refreshToken')));

        const now = new Date()
        if ((now.getTime() - refreshToken?.expire) > 14200000) {
            removeLocalStorage('token');
            removeLocalStorage('refreshToken');
        } else {
            return null;
        }
    }
}

    // if ((now.getTime() - refreshToken?.expire) > 14200000) {
    //     const user = decryptItem(JSON.parse(localStorage.getItem('user')));

    //     if (Object.keys(props.userDuck.user).length !== 0) {
    //         signInPostApi({
    //             email: props.userDuck.user.email,
    //             password: props.userDuck.user.password
    //         }).then(res => {
    //             setLocalStorage("token", res?.data?.token);
    //             setLocalStorage("refreshToken", res?.data?.refreshToken);
    //             props.dispatch(setToken(res?.data?.token));
    //             props.dispatch(setUser())
    //         })
    //     } else {
    //         if (user !== null) {
    //             signInPostApi({
    //                 email: user?.user?.email,
    //                 password: user?.user?.name
    //             }).then(res => {
    //                 setLocalStorage("token", res?.data?.token);
    //                 setLocalStorage("refreshToken", res?.data?.refreshToken);
    //                 props.dispatch(setToken(res?.data?.token));
    //                 props.dispatch(setUser())
    //             })
    //         }
    //     }
    // }

    // if((now.getTime() - token.expire) > 3500000){
    //     updateAuthTokenPostApi(refreshToken)
    // }
}

const mapStateToProps = (state) => ({
    userDuck: state.userDuck
})

connect(mapStateToProps)(useUSer)