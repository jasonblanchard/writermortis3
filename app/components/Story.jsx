import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';

export default class Story extends Component {

  renderPiece(piece) {
    return (
      <p key={piece.id}>
        {piece.text}
      </p>
    );
  }


  render() {
    const story = this.props.story;
    return (
      <div>
        {story.pieces.map(this.renderPiece)}
      </div>
    );
  }
}

Story.propTypes = {
  story: ImmutablePropTypes.map,
};
