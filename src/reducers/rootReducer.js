import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import menu from './menu';
import user from './user';
import product from './product';
import redditReducer from './reddit';
import todoReducer from './todo';
import notices from './notice';

export const rootReducer = combineReducers({
  menu,
  user,
  product,
  notices,
  redditReducer,
  todoReducer,
  router,
});
