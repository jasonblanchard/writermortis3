import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'app/routes';
import { Provider } from 'react-redux';
import configureStore from 'app/configureStore';
import { Router, browserHistory } from 'react-router';
import '../scss/site.scss';

// const initialState = JSON.parse(document.getElementById('init-data').value);

// TODO: Move this.
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

let currentClientId = localStorage.getItem('clientId');

if (!currentClientId) {
  currentClientId = guid();
  currentClientId = localStorage.setItem('clientId', currentClientId);
}

const initialState = { currentClientId };

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
