import React from 'react';
import { IndexRoute, Route } from 'react-router';
import RootPageHandler from 'app/pages/RootPageHandler';
import AboutPage from 'app/pages/AboutPage';
import NoMatchPage from 'app/pages/NoMatchPage';
import StoryPageHandler from 'app/pages/StoryPageHandler';

export default (
  <Route path="/" component={RootPageHandler}>
    <Route path="/about" component={AboutPage} />
    <Route path="/stories/:storyId" component={StoryPageHandler} />
    <IndexRoute component={AboutPage} />
    <Route path="*" component={NoMatchPage}/>
  </Route>
);
