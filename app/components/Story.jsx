import React, { Component, PropTypes } from 'react';

export default class Story extends Component {

  renderPiece(piece) {
    return (
      <p>
        {piece.text}
      </p>
    );
  }


  render() {
    return (
      <div>
        {this.props.story.map(this.renderPiece)}
      </div>
    );
  }
}

Story.propTypes = {
  story: PropTypes.object,
};
