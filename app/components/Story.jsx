import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';

import formatMarkdown from 'app/utils/formatMarkdown';
import './Story.scss';

export default class Story extends Component {
  renderPiece(piece) {
    return (
      <div className="Story-piece" key={piece.get('id')} dangerouslySetInnerHTML={formatMarkdown(piece.get('text'))} />
    );
  }

  render() {
    const story = this.props.story;
    return (
      <div>
        [complete]
        {story.get('pieces').map(this.renderPiece.bind(this))}
      </div>
    );
  }
}

Story.propTypes = {
  story: ImmutablePropTypes.map,
};
