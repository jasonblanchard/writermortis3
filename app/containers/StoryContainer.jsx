import * as actions from 'app/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Story from 'app/components/Story';
import StoryEditor from 'app/components/StoryEditor';
import StoryStats from 'app/components/StoryStats';
import './StoryContainer.scss';

class StoryContainer extends Component {

  isStoryComplete() {
    const story = this.props.story;
    return story.get('pieces').size >= story.maxPieces;
  }

  render() {
    const { story, addNewPiece, currentClientId } = this.props;
    return (
      <div className="StoryContainer">
        <div className="StoryContainer-StoryWrapper">
          <h2>{story.title}</h2>
          {this.isStoryComplete() ? <Story story={story} /> : <StoryEditor currentClientId={currentClientId} story={story} onSubmit={addNewPiece} />}
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
  story: ImmutablePropTypes.map,
  addNewPiece: PropTypes.func,
  currentClientId: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    story: state.story,
    currentClientId: state.currentClientId,
  };
}

function mapDispatchToProps(dispatch) {
  const actionMapping = {
    addNewPiece: actions.requestAddNewPiece,
  };

  return bindActionCreators(actionMapping, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
