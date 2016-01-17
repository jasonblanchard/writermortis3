import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';

export default class StoryStats extends Component {

  renderClient(piece) {
    const clientId = piece.get('clientId');
    return <div key={clientId}>{clientId}</div>;
  }

  render() {
    const story = this.props.story;
    return (
      <div>
        {story.get('pieces').map(this.renderClient)}
      </div>
    );
  }
}

StoryStats.propTypes = {
  story: ImmutablePropTypes.map,
};
