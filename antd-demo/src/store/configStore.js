/**
 * Created by chenyao0913 on 2016/3/30.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from '../reducers/rootReducer';

export default function configStore(initialState = {}, history) {
  const tmpMiddles = [thunkMiddleware, routerMiddleware(history)];
  let middleWare;
  if (__DEV__) {
    // 日志
    const createLogger = require('redux-logger');
    const loggerMiddleware = createLogger();
    tmpMiddles.push(loggerMiddleware);
    // 开发者工具
    const devTool = window.devToolsExtension ? window.devToolsExtension() : f => f;
    middleWare = compose(applyMiddleware(...tmpMiddles), devTool);
  } else {
    middleWare = compose(applyMiddleware(...tmpMiddles));
  }

  const store = createStore(rootReducer, initialState, middleWare);
  // const store = middleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
