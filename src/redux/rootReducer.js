import { combineReducers } from 'redux';

// È il contenitore dei nostri REDUCER

//DUCK
import tokenDuck from './ducks/tokenDuck';
import userDuck from './ducks/userDuck';
import addressDuck from './ducks/addressDuck';
import positionDuck from './ducks/positionDuck';
import guestDuck from './ducks/guestDuck';
import propertyDuck from './ducks/propertyDuck';

const rootReducer = combineReducers({
    tokenDuck,
    userDuck,
    addressDuck,
    positionDuck,
    guestDuck,
    propertyDuck
});


export default rootReducer;
