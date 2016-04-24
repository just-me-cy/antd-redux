import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { VisibilityFilters } from '../constant/todo';
import { addTodo, completeTodo, setVisibilityFilter } from '../actions/todo';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';


class AppTodo extends Component {
  static propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })),
    visibilityFilter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_COMPLETED',
      'SHOW_ACTIVE',
    ]).isRequired,
  }
  render() {
    // 通过调用 connect() 注入:
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={text =>
            dispatch(addTodo(text))
          }
        />
        <TodoList
          todos={this.props.visibleTodos}
          onTodoClick={index  =>
           dispatch(completeTodo(index))
          }
        />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
           dispatch(setVisibilityFilter(nextFilter))
          }
        />
      </div>
    );
  }
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

function select(state) {
  const { visibilityFilter, todos } = state.todoReducer;
  return {
    visibleTodos: selectTodos(todos, visibilityFilter),
    visibilityFilter,
  };
}

export default connect(select)(AppTodo);
