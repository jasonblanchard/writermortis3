import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';

export default class StoryEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newPiece: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      newPiece: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.story.get('id'), {
      text: this.state.newPiece,
      clientId: this.props.currentClientId,
    });
    this.setState({
      newPiece: '',
    });
  }

  isCurrentClientLastAuthor() {
    return this.props.currentClientId === this.props.story.get('pieces').last().get('clientId');
  }

  render() {
    const story = this.props.story;
    const piece = story.get('pieces').last();
    return (
      <div className="StoryEditor">
        <div className="StoryEditor-pieceWrapper">
          <p>{piece.get('text')}</p>
        </div>
        <div className="StoryEditor-pieceComposerWrapper">
          {this.isCurrentClientLastAuthor() ? 'You added the last piece' : null}
          <form onSubmit={this.handleSubmit}>
            <div>
              <textarea value={this.state.newPiece} onChange={this.handleChange} />
            </div>
            <input type="submit" value="add" />
          </form>
        </div>
      </div>
    );
  }
}

StoryEditor.propTypes = {
  story: ImmutablePropTypes.map.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentClientId: PropTypes.number,
};
