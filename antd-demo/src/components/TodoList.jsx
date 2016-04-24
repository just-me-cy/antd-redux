import React, { Component, PropTypes } from 'react';
import {Row, Col, Icon} from 'antd';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  static propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row style={{ marginTop: 20 }}>
        <Col span="6">&nbsp;</Col>
        <Col span="8">
          <ul>
            {this.props.todos.map((todo, index) =>
                <TodoItem {...todo}
                  key={index}
                  onClick={() => this.props.onTodoClick(index)}
                />
            )}
          </ul>
      </Col>
      </Row>
    );
  }
}
export default TodoList;
