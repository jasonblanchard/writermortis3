import React from 'react';
import { IndexRoute, Route } from 'react-router';
import RootContainer from 'app/containers/RootContainer';
import AboutContainer from 'app/containers/AboutContainer';
import NoMatch from 'app/containers/NoMatch';
import StoryContainer from 'app/containers/StoryContainer';

export default (
  <Route path="/" component={RootContainer}>
    <Route path="/about" component={AboutContainer} />
    <Route path="/stories/:storyId" component={StoryContainer} />
    <IndexRoute component={AboutContainer} />
    <Route path="*" component={NoMatch}/>
  </Route>
);
