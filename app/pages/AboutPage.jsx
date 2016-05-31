import React from 'react';

import MainPageLayout from 'app/layouts/MainPageLayout';

export default class About extends React.Component {
  render() {
    return (
      <MainPageLayout className="AboutContainer-wrapper">
        <p role="main" className="MainPageLayout-mainContent">
          A realtime <a href="https://en.wikipedia.org/wiki/Exquisite_corpse">exquisite corpse</a>. Each writer only sees a part of previous writer's contributions. In the end, you get a weird story.
        </p>
      </MainPageLayout>
    );
  }
}
