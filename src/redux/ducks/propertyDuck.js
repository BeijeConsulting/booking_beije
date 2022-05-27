const SET_PROPERTY = 'web/user/SET_PROPERTY';
const INIT_PROPERTY = 'web/user/INIT_PROPERTY';


export function setProperty(value) {
    return {
        type: SET_PROPERTY,
        payload: {
            property: value
        }
    }
}

export function initProperty() {
    return {
        type: SET_PROPERTY,
        payload: {
            property: []
        }
    }
}

const INIT_STATE = {
    property: []
}

export default function propertyDuck(state = INIT_STATE, action) {
    var newState;
    switch (action.type) {
        case SET_PROPERTY:
            newState = Object.assign({}, state);
            newState.property = action.payload.property
            
            return newState;

        case INIT_PROPERTY:
            newState = Object.assign({}, state);
            newState.property = [];
            return newState;

        default:
            return state;
    }
}