import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import CoreLayout from '../layout/CoreLayout';
import Index from '../components/Index';

import showDatePicker from '../components/DatePicker';
import myForm from '../components/Form';
import appTodo from '../containers/Todo';
import reddit from '../containers/Reddit';
import product from '../containers/Product';
import FormDemo from '../components/editableTable/FormDemo';
import notice from '../containers/FormDemo';

/**
 * 系统路由
 */
export default class Routes extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object,
  };

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={CoreLayout}>
          <IndexRoute component={Index} />
          <Route path="index" component={Index} />
          <Route path="antd">
            <Route path="myForm" component={myForm} />
            <Route path="showDatePicker" component={showDatePicker} />
            <Route path="showEditableTable" component={FormDemo} />
          </Route>
          <Route path="redux">
            <Route path="appTodo" component={appTodo} />
            <Route path="reddit" component={reddit} />
            <Route path="product" component={product} />
            <Route path="notice" component={notice} />
          </Route>
        </Route>
      </Router>
    );
  }
}
