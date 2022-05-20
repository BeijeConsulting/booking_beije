import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './redux/rootReducer';

let middlewares = [thunk];
//if (process.env && process.env.NODE_ENV !== 'production') {
middlewares = [...middlewares, logger];
//}
// logger, thunk
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const applicationStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);
export default applicationStore;
