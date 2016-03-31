import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import About from './About';
import Inbx from './Inbox';

const AppRoute = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

export default AppRoute;