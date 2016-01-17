import React, { Component, PropTypes } from 'react';

export default class StoryEditor extends Component {

  render() {
    const story = this.props.story;
    const piece = story.pieces[1];
    return (
      <div>
        {piece.text}
      </div>
    );
  }
}

StoryEditor.propTypes = {
  story: PropTypes.object,
};
