import { myProfilesGetApi } from '../../services/api/user/userApi'
import { getLocalStorage } from '../../utils/localStorage/localStorage';

const SET_USER = 'web/user/SET_USER';
const INIT_USER = 'web/user/INIT_USER';

export function setUser() {
    return {
        type: SET_USER,
        payload: {
            user: {}
        }
    }
}

export function initUser() {
    return {
        type: INIT_USER,
        payload: {
            user: {}
        }
    }
}

const INIT_STATE = {
    user: {}
}
/**
 * handle action.type, return the new value of state
 * @param  {object} state=INIT_STATE
 * @param  {funnction} action
 * @returns {object} return the state with the new value
 */
export default function userDuck(state = INIT_STATE, action) {
    var newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            myProfilesGetApi(getLocalStorage('token')).then(res => newState.user = res.data);
            
            return newState;

        case INIT_STATE:
            newState = Object.assign({}, state);
            newState.user = {};
            return newState;

        default:
            return state;
    }
}