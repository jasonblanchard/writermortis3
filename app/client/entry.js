import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'app/routes';
import { Provider } from 'react-redux';
import configureStore from 'app/configureStore';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import '../scss/site.scss';

const history = createBrowserHistory();

const initialState = JSON.parse(document.getElementById('init-data').value);

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
