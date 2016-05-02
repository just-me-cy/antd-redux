import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import menu from './menu';
import user from './user';
import product from './product';
import redditReducer from './reddit';
import todoReducer from './todo';

export const rootReducer = combineReducers({
  menu,
  user,
  product,
  redditReducer,
  todoReducer,
  router,
});
