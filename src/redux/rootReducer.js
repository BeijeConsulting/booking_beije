import { combineReducers } from 'redux';

// È il contenitore dei nostri REDUCER

//DUCK
import tokenDuck from './ducks/tokenDuck';

const rootReducer = combineReducers({
    tokenDuck,
});


export default rootReducer;
