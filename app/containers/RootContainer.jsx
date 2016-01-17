import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router';
import './RootContainer.scss';

const propTypes = {
  children: PropTypes.node,
};

export default class RootContainer extends React.Component {
  render() {
    return (
      <div className="RootContainer-mainWrapper">
        <header>
          <div className="RootContainer-headerWrapper">
            <h1><Link to="/">Writermortis</Link></h1>
            <nav className="RootContainer-mainNav">
              <ul className="RootContainer-mainNavLinks">
                <li><Link to="/about" activeClassName="active">About</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="RootContainer-mainContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

RootContainer.propTypes = propTypes;
