import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'app/routes';
import { Provider } from 'react-redux';
import configureStore from 'app/configureStore';
import { Router, browserHistory } from 'react-router';
import '../scss/site.scss';

const initialState = {
  currentClientId: 1, // TODO: Load this from localStorage. Set it if it's not there.
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
