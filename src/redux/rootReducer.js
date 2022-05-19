import { combineReducers } from 'redux';

// È il contenitore dei nostri REDUCER

//DUCK
import tokenDuck from './ducks/tokenDuck';
import userDuck from './ducks/userDuck';

const rootReducer = combineReducers({
    tokenDuck,
    userDuck
});


export default rootReducer;
