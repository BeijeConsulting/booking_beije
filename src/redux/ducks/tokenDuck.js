import { encryptItem } from '../../utils/crypto/crypto';


const SET_TOKEN = 'web/token/SET_TOKEN';
const INIT_TOKEN = 'web/token/INIT_TOKEN';

/**
 * @param  {string} value
 * @returns {object} token value will be the encrypted token
 */
export function setToken(value) {
    return {
        type: SET_TOKEN,
        payload: {
            token: value
        }
    }
}
/**
 * @returns {object} reset token to null for logout
 */
export function initToken() {
    return {
        type: INIT_TOKEN,
        payload: {
            token: null
        }
    }
}

const INIT_STATE = {  // default token value
    token: null
}
/**
 * @param  {object} state=INIT_STATE
 * @param  {string} action
 */
export default function tokenDuck(state = INIT_STATE, action) {
    var newState
    
    /**
     * @param  {string} action.type
     * @returns {object} return state
     */
    switch (action.type) {
        case SET_TOKEN:
            newState = Object.assign({}, state);
            newState.token = encryptItem(action.payload.token); // token get encrypted ans set it as new value
            return newState;

        case INIT_STATE:
            newState = Object.assign({}, state);
            newState.token = null;
            return newState;

        default:
            return state;
    }
}