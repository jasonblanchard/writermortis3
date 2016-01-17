import * as actions from 'app/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Story from 'app/components/Story';
import StoryEditor from 'app/components/StoryEditor';
import StoryStats from 'app/components/StoryStats';
import './StoryContainer.scss';

class StoryContainer extends Component {

  isStoryComplete() {
    const story = this.props.story;
    return story.pieces.length >= story.maxPieces;
  }

  render() {
    const story = this.props.story;
    return (
      <div className="StoryContainer">
        <div className="StoryContainer-StoryWrapper">
          <h2>{story.title}</h2>
          {this.isStoryComplete() ? <Story story={story} /> : <StoryEditor story={story} />}
        </div>
        <div className="StoryContainer-StoryStatsWrapper">
          <h3>stats</h3>
          <StoryStats />
        </div>
      </div>
    );
  }
}

StoryContainer.propTypes = {
  story: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    story: state.story,
  };
}

function mapDispatchToProps(dispatch) {
  const actionMapping = {
    addSomeValue: actions.addSomeValue,
  };

  return bindActionCreators(actionMapping, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
