import React, { Component, PropTypes } from 'react';
import {Row, Col, Icon} from 'antd';

const TodoItem  = React.createClass({
  render() {
    return (

          <li
            onClick={this.props.onClick}
            style={{
              textDecoration: this.props.completed ? 'line-through' : 'none',
              cursor: this.props.completed ? 'default' : 'pointer'
            }}>
            {this.props.text}
          </li>

    );
  }
});

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};
export default TodoItem;