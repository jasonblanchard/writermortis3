import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';

export default class Story extends Component {

  renderPiece(piece) {
    return (
      <p key={piece.get('id')}>
        {piece.get('text')}
      </p>
    );
  }

  render() {
    const story = this.props.story;
    return (
      <div>
        [complete]
        {story.get('pieces').map(this.renderPiece)}
      </div>
    );
  }
}

Story.propTypes = {
  story: ImmutablePropTypes.map,
};
