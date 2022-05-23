const SET_POSITION = 'web/position/SET_POSITION';
const INIT_POSITION = 'web/position/INIT_POSITION';


export function setPosition(value) {
    return {
        type: SET_POSITION,
        payload: {
            coordinates: value
        }
    }
}

export function initPosition() {
    return {
        type: INIT_POSITION,
        payload: {
            coordinates: [45.44982831807649, 9.238670319666845]
        }
    }
}

const INIT_STATE = {
    coordinates: [45.44982831807649, 9.238670319666845]
}

export default function positionDuck(state = INIT_STATE, action) {
    var newState;
    switch (action.type) {
        case SET_POSITION:
            newState = Object.assign({}, state);
            newState.coordinates = action.payload.coordinates;
            return newState

        case INIT_POSITION:
            newState = Object.assign({}, state);
            newState.coordinates = [];
            return newState;

        default:
            return state;
    }
}