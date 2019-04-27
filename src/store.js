import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import {loadState, saveState} from './localStorage';
import {throttle} from 'lodash';
const initialState = loadState();
const middleware = [thunk];

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware), 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
store.subscribe(throttle(() => {
    saveState( store.getState()
    );
}));
export default store;