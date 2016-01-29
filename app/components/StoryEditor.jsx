import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import MarkdownIt from 'markdown-it';
import React, { Component, PropTypes } from 'react';

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

  renderMarkdown(markdown) {
    const md = new MarkdownIt();

    return {
      __html: md.render(markdown),
    };
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea value={this.state.newPieceText} onChange={this.handleChange} />
        </div>
        <input type="submit" value="add" />
      </form>
    );
  }

  render() {
    const story = this.props.story;
    const piece = story.get('pieces').last();
    return (
      <div className="StoryEditor">
        <div className="StoryEditor-pieceWrapper">
          <div className="StoryEditor-lastPieceMask"></div>
          <div className="StoryEditor-lastPiece" dangerouslySetInnerHTML={this.renderMarkdown(piece.get('text'))} />
          <div className="StoryEditor-newPiece" dangerouslySetInnerHTML={this.renderMarkdown(this.state.newPieceText)}/>
        </div>
        <div className="StoryEditor-pieceComposerWrapper">
          {this.isCurrentClientLastAuthor() ? 'You added the last piece' : this.renderForm()}
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
