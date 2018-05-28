import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import {
  Router,
  browserHistory,
} from 'react-router';

import './views/styles.scss';

import myApp from './reducers';
import routes from './routes';

const logger = createLogger();

const appStore = createStore(myApp, compose(applyMiddleware(thunk, logger)));
export const store = appStore; // eslint-disable-line

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={appStore}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app'),
);
