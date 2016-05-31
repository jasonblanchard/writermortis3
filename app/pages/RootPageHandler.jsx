import React from 'react';
import { PropTypes } from 'react';

export default class RootPageHandler extends React.Component {
  render() {
    return this.props.children;
  }
}

RootPageHandler.propTypes = {
  children: PropTypes.node,
};
