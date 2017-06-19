import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import globals from './globals';
import windows from './windows';

const myApp = combineReducers({
    globals,
    windows,
    routing: routerReducer
});

export default myApp;