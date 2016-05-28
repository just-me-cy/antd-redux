import ReactDOM from 'react-dom';
import React from 'react';
import Routes from '../routes/Routes';
import { useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import configStore from '../store/configStore';
import Root from '../containers/Root';
import { initCurrentMenu } from '../actions/menu';
import '../common/lib';

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

const initialState = window.__INITIAL_STATE__;
const store = configStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

history.listen(location => {
  const { action, pathname } = location;
  if (action === 'POP') {
    const arr = pathname.split('/');
    const len = arr.length;
    let currentKey = 'index';
    let currentSubMenu = '';
    if (len > 2) {
      // 匹配到二级目录
      currentKey = arr[2];
      currentSubMenu = arr[1];
    } else if (len === 2 && arr[1]) {
      // 匹配到一级目录
      currentKey = arr[1];
    }
    store.dispatch(initCurrentMenu({ currentKey, currentSubMenu }));
  }
})();

let render = () => {
  const routes = <Routes history={history} store={store} />;
  ReactDOM.render(
    <Root
      history={history}
      store={store}
      routes={routes}
    />,
	document.getElementById('wrap')
  );
};

if (module.hot) {
  const renderNormally = render;
  const renderExceptoin = (err) => {
    const redbox = require('redbox-react');
    ReactDOM.render(<redbox error={err} />, document.getElementById('wrap'));
  };
  render = () => {
    try {
      renderNormally();
    } catch (error) {
      renderExceptoin(error);
    }
  };

  module.hot.accept(['../routes/Routes', '../containers/Root.jsx'], () => {
    render();
  });
}

render();
