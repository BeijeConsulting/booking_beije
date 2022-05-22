import { combineReducers } from 'redux';

// È il contenitore dei nostri REDUCER

//DUCK
import tokenDuck from './ducks/tokenDuck';
import userDuck from './ducks/userDuck';
import addressDuck from './ducks/addressDuck';
import positionDuck from './ducks/positionDuck';

const rootReducer = combineReducers({
    tokenDuck,
    userDuck,
    addressDuck,
    positionDuck
});


export default rootReducer;
