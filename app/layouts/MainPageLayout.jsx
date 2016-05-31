import { Link } from 'react-router';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import './MainPageLayout.scss';

export default class MainPageLayout extends Component {
  render() {
    const className = classNames('MainPageLayout', this.props.className);
    return (
      <section className={className}>
        <header>
          <div className="MainPageLayout-headerWrapper">
            <h1><Link to="/">Writermortis</Link></h1>
            <nav className="MainPageLayout-mainNav">
              <ul className="MainPageLayout-mainNavLinks">
                <li><Link to="/about" activeClassName="active">What is this?</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        {this.props.children}
      </section>
    );
  }
}

MainPageLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
