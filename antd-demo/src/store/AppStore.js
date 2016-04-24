/**
 * Created by chenyao0913 on 2016/3/30.
 */
import {
	createStore, applyMiddleware, combineReducers,
}
from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import productReducer from '../reducers/product';
import redditReducer from '../reducers/reddit';
import todoReducer from '../reducers/todo';
import {
	syncHistoryWithStore, routerReducer,
}
from 'react-router-redux';

const rootReducer = combineReducers({
  productReducer,
  redditReducer,
  todoReducer,
  routing: routerReducer,
});

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	loggerMiddleware
)(createStore);

export default function storePro(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
