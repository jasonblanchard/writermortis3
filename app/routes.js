import React from 'react';
import { IndexRoute, Route } from 'react-router';
import RootContainer from 'app/containers/RootContainer';
import AboutContainer from 'app/containers/AboutContainer';
import ExampleContainer from 'app/containers/ExampleContainer';
import HelloContainer from 'app/containers/HelloContainer';
import NoMatch from 'app/containers/NoMatch';

export default (
  <Route path="/" component={RootContainer}>
    <Route path="/about" component={AboutContainer} />
    <Route path="/hello/:name" component={HelloContainer} />
    <IndexRoute component={ExampleContainer} />
    <Route path="*" component={NoMatch}/>
  </Route>
);
