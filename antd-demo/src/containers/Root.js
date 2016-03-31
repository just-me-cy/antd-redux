/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import AsyncApp from './AsyncApp';

import {Row,Col} from 'antd';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}
