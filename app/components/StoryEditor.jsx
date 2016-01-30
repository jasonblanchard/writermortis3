import classNames from 'classnames';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';

import formatMarkdown from 'app/utils/formatMarkdown';
import './StoryEditor.scss';

export default class StoryEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newPieceText: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      newPieceText: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.story, Immutable.fromJS({
      text: this.state.newPieceText,
    }));
    this.setState({
      newPieceText: '',
    });
  }

  isCurrentClientLastAuthor() {
    return this.props.currentClientId === this.props.story.get('pieces').last().get('clientUser').get('id');
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea className="StoryEditor-newPieceInput" value={this.state.newPieceText} onChange={this.handleChange} />
        </div>
        <input type="submit" value="add" />
      </form>
    );
  }

  renderPiece(piece, index) {
    const className = classNames('StoryEditor-lastPiece', { 'StoryEditor-penultimatePiece': index === 0 });
    const length = piece.get('text').length;
    const text = index !== 0 ? piece.get('text') : piece.get('text').slice(length - 150, length);
    return (
      <div key={index} className={className} dangerouslySetInnerHTML={formatMarkdown(text)} />
    );
  }

  render() {
    const story = this.props.story;
    const pieceLength = story.get('pieces').size;
    const visiblePieces = story.get('pieces').slice(pieceLength - 2, pieceLength);
    return (
      <div className="StoryEditor">
        <div className="StoryEditor-pieceWrapper">
          {pieceLength > 0 ? <div className="StoryEditor-lastPieceMask"></div> : null}
          <div className="StoryEditor-lastPieces">
            {visiblePieces.map(this.renderPiece)}
          </div>
          <div className="StoryEditor-newPiece" dangerouslySetInnerHTML={formatMarkdown(this.state.newPieceText)}/>
        </div>
        <div className="StoryEditor-pieceComposerWrapper">
          {this.isCurrentClientLastAuthor() ? 'You added the last piece. Wait for someone to continue the story!' : this.renderForm()}
        </div>
      </div>
    );
  }
}

StoryEditor.propTypes = {
  story: ImmutablePropTypes.map.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentClientId: PropTypes.string,
};
