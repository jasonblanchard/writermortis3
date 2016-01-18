import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';

export default class StoryStats extends Component {

  renderClientUser(piece) {
    const clientUser = piece.get('clientUser');
    return <div key={clientUser.get('id')}>{clientUser.get('id')}</div>;
  }

  render() {
    const story = this.props.story;
    return (
      <div>
        {story.get('pieces').map(this.renderClientUser)}
      </div>
    );
  }
}

StoryStats.propTypes = {
  story: ImmutablePropTypes.map,
};
