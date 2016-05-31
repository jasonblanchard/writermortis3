import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';

import * as actions from 'app/actions/actions';
import StoryPage from 'app/pages/StoryPage';

class StoryPageHandler extends Component {
  componentWillMount() {
    this.props.requestLoadStory(this.props.params.storyId);
  }

  render() {
    return <StoryPage {...this.props} />;
  }
}

function mapStateToProps(state) {
  let story = Immutable.fromJS({});

  if (state.currentStoryId) {
    story = state.entities.get('story').get(String(state.currentStoryId));
    let pieces = story.get('pieces').map(pieceId => state.entities.get('piece').get(String(pieceId)));
    pieces = pieces.map(piece => {
      const user = state.entities.get('clientUser').get(String(piece.get('clientUser')));
      return piece.set('clientUser', user);
    });
    story = story.set('pieces', pieces);
  }

  return {
    story,
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

StoryPageHandler.propTypes = {
  addNewPiece: PropTypes.func,
  children: PropTypes.node,
  currentClientId: PropTypes.string,
  params: PropTypes.object,
  requestLoadStory: PropTypes.func,
  story: ImmutablePropTypes.map,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryPageHandler);
