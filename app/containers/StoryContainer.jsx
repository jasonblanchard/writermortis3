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

  componentWillMount() {
    this.props.requestLoadStory(this.props.params.storyId);
  }

  isStoryComplete() {
    const story = this.props.story;
    return story.get('pieces').size >= story.get('maxPieces');
  }

  render() {
    const { story, addNewPiece, currentClientId } = this.props;
    if (!this.props.story.get('id')) return null;
    return (
      <div className="StoryContainer">
        <div className="StoryContainer-StoryWrapper">
          <h2>{story.get('title')}</h2>
          {this.isStoryComplete() ? <Story story={story} /> : <StoryEditor currentClientId={currentClientId} story={story} onSubmit={addNewPiece} />}
        </div>
        <div className="StoryContainer-StoryStatsWrapper">
          <h3>stats</h3>
          <StoryStats story={story}/>
        </div>
      </div>
    );
  }
}

StoryContainer.propTypes = {
  story: ImmutablePropTypes.map,
  addNewPiece: PropTypes.func,
  currentClientId: PropTypes.string,
  requestLoadStory: PropTypes.func,
  params: PropTypes.object,
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
    requestLoadStory: actions.requestStory,
  };

  return bindActionCreators(actionMapping, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);
