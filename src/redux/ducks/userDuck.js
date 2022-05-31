const SET_USER = 'web/user/SET_USER';
const INIT_USER = 'web/user/INIT_USER';

export function setUser(value) {
    return {
        type: SET_USER,
        payload: {
            user: value
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
            newState.user = action.payload.user;
            /*  let res = await myProfilesGetApi(getLocalStorage('token'));
             newState.user = res.data; */
            return newState;

        case INIT_STATE:
            newState = Object.assign({}, state);
            newState.user = {};
            return newState;

        default:
            return state;
    }
}