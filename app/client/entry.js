import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'app/routes';
import { Provider } from 'react-redux';
import configureStore from 'app/configureStore';
import { Router, browserHistory } from 'react-router';
import '../scss/site.scss';

// const initialState = JSON.parse(document.getElementById('init-data').value);
const initialState = require('../../server_src/server/fixtures/initialStateFixture');

initialState.currentClientId = 1;

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
