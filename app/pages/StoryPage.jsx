import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';

import MainPageLayout from 'app/layouts/MainPageLayout';
import Story from 'app/components/Story';
import StoryEditor from 'app/components/StoryEditor';

import './StoryPage.scss';

export default class StoryPage extends Component {

  isStoryComplete() {
    const story = this.props.story;
    return story.get('pieces').size >= story.get('maxPieces');
  }

  render() {
    const { story, addNewPiece, currentClientId } = this.props;
    if (!this.props.story.get('id')) return null;
    return (
      <MainPageLayout className="StoryPage">
        <div role="main" className="MainPageLayout-mainContent StoryPage-content">
          <div className="StoryPage-StoryWrapper">
            <h2>{story.get('title')}</h2>
            {this.isStoryComplete() ? <Story story={story} /> : <StoryEditor currentClientId={currentClientId} story={story} onSubmit={addNewPiece} />}
          </div>
          <div className="StoryPage-StoryStatsWrapper">
          </div>
        </div>
      </MainPageLayout>
    );
  }
}

StoryPage.propTypes = {
  story: ImmutablePropTypes.map,
  addNewPiece: PropTypes.func,
  currentClientId: PropTypes.string,
  params: PropTypes.object,
};
