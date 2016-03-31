/**
 * Created by chenyao0913 on 2016/3/30.
 */
import { createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducersPro';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

export default function storePro(initialState) {
  return createStoreWithMiddleware(rootReducer,initialState);
};
