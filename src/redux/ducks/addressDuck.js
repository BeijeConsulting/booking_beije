const SET_ADDRESS = 'web/address/SET_ADDRESS';
const INIT_ADDRESS = 'web/address/INIT_ADDRESS';

export function setAddress(value) {
    return {
        type: SET_ADDRESS,
        payload: {
            address: value
        }
    }
}

export function initAddress() {
    return {
        type: INIT_ADDRESS,
        payload: {
            address: []
        }
    }
}

const INIT_STATE = {
    address: []
}

export default function addressDuck(state = INIT_STATE, action) {
    var newState;
    switch (action.type) {
        case SET_ADDRESS:
            newState = Object.assign({}, state);
            newState.address = action.payload.address;
            return newState;

        case INIT_ADDRESS:
            newState = Object.assign({}, state);
            newState.address = [];
            return newState;

        default:
            return state;
    }
}