import '../common/lib';
//import Layout from '../component/Layout';
//import App from '../component/App';
//import Form from '../component/Form';
//import Menu from '../component/Menu';

import ReactDOM from 'react-dom';
import React from 'react';

import { ROUTES } from '../component/RouteCfg';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../reducers/reducers';
import AppTodo from '../components/AppTodo';

let store = createStore(todoApp);

//const history = syncHistoryWithStore(browserHistory, store);


//let history = createHashHistory({
//  queryKey: false
//});


const history = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(<Provider store={store}><Router routes={ROUTES} history={history}/></Provider>,document.getElementById('wrap'));



//ReactDOM.render(<App />, document.getElementById('data-picker'));
//ReactDOM.render(<Provider store={store}><AppTodo /></Provider>, document.getElementById('form'));
//ReactDOM.render(<Form />, document.getElementById('form'));
//ReactDOM.render(<Menu />, document.getElementById('menu'));


