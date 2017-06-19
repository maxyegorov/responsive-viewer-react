require('./views/styles.scss');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createLogger }  from 'redux-logger';
import thunk from 'redux-thunk';
import myApp from './reducers';
import routes from './routes';
import App from './views/main';

const logger = createLogger();

const store = createStore( myApp, compose(applyMiddleware(thunk, logger)) );

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);