import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import menu from './menu';
import user from './user';
import product from './product';
import redditReducer from './reddit';
import todoReducer from './todo';
import noticeReducer from './notice';

export const rootReducer = combineReducers({
  menu,
  user,
  product,
  noticeReducer,
  redditReducer,
  todoReducer,
  router,
});
