/*
 * action 创建函数--todo
 */
import * as type from '../constant/todo';

export function addTodo(text) {
  return {
    type: type.ADD_TODO,
    text,
  };
}

export function completeTodo(index) {
  return {
    type: type.COMPLETE_TODO,
    index,
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: type.SET_VISIBILITY_FILTER,
    filter,
  };
}
