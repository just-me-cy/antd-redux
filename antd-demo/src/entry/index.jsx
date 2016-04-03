import '../common/lib';
import ReactDOM from 'react-dom';
import React from 'react';

import { ROUTES } from '../routes/RouteCfg';
import {Router, useRouterHistory, browserHistory} from 'react-router';
import {createHashHistory} from 'history';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { Provider } from 'react-redux'
import { createStore } from 'redux';

import AppStore from '../store/AppStore';
const store = AppStore();
// const history = useRouterHistory(createHashHistory)({ queryKey: false });
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
					<Router routes={ROUTES} history={history}/>
				</Provider>,document.getElementById('wrap'));



//ReactDOM.render(<App />, document.getElementById('data-picker'));
//ReactDOM.render(<Provider store={store}><AppTodo /></Provider>, document.getElementById('form'));
//ReactDOM.render(<Form />, document.getElementById('form'));
//ReactDOM.render(<Menu />, document.getElementById('menu'));


