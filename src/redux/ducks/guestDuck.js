const SET_GUEST = 'web/user/SET_GUEST';
const INIT_GUEST = 'web/user/INIT_GUEST';


export function setGuest(value) {
    return {
        type: SET_GUEST,
        payload: {
            guest: value
        }
    }
}

export function initGuest() {
    return {
        type: SET_GUEST,
        payload: {
            guest: 2
        }
    }
}

const INIT_STATE = {
    guest: 2
}

export default function guestDuck(state = INIT_STATE, action) {
    var newState;
    switch (action.type) {
        case SET_GUEST:
            newState = Object.assign({}, state);
            newState.guest = action.payload.guest;
            
            return newState;

        case INIT_GUEST:
            newState = Object.assign({}, state);
            newState.guest = {};
            return newState;

        default:
            return state;
    }
}