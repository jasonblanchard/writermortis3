import React from 'react';
import ReactDOM from 'react-dom';
import routes from 'app/routes';
import { Provider } from 'react-redux';
import configureStore from 'app/configureStore';
import { Router, browserHistory } from 'react-router';
import '../scss/site.scss';
import io from 'socket.io-client';
import { storySchema, loadEntities } from 'app/actions/actions';
import { normalize } from 'normalizr';
import Immutable from 'immutable';

import env from '../../env';
import { guid } from 'app/utils/guid';

const config = env[process.env.NODE_ENV || 'development'];

// const initialState = JSON.parse(document.getElementById('init-data').value);

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

const socket = io.connect(`http://${config.HOST}`);

socket.on('update', (story) => {
  const entities = normalize(story, storySchema).entities;
  store.dispatch(loadEntities(Immutable.fromJS(entities)));
});
