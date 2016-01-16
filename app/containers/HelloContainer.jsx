import React from 'react';
import { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  params: PropTypes.object,
};

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        Hello, {this.props.params.name}!
      </div>
    );
  }
}

Hello.propTypes = propTypes;
