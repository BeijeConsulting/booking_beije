import { myProfilesGetApi } from '../../services/api/user/userApi'
// import { getLocalStorage } from '../../utils/localStorage/localStorage';

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

export default async function userDuck(state = INIT_STATE, action) {
    var newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            let res = await myProfilesGetApi('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNvbGFmYXN1bGxpQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNjUyOTY0ODE1LCJleHAiOjE2NTI5Njg0MTV9.mbp0mwQw2OMOwey6YJK43_Y644jVHfWDdmtr44yPKcE');
            // let res = await myProfilesGetApi(getLocalStorage('token'));
            newState.user = res.data;
            return newState;

        case INIT_STATE:
            newState = Object.assign({}, state);
            newState.user = {};
            return newState;

        default:
            return state;
    }
}