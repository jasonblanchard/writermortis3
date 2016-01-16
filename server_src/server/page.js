import env from '../../env.json';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../app/configureStore';
import initialState from './fixtures/initialStateFixture';
import routes from '../../app/routes';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';

const store = configureStore(initialState);
const data = initialState;
const config = env[process.env.NODE_ENV || 'development'];

export default (req, res) => {
  const location = createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      const markup = ReactDOMServer.renderToString(
        <Provider store={store}>
          <RoutingContext {...renderProps}/>
        </Provider>
      );

      res.render('index', {
        markup: markup,
        initialState: JSON.stringify(data),
        scriptSource: config.SCRIPT_SOURCE,
        styleSource: config.STYLE_SOURCE,
      });
    }
  });
};
