/**
 * Created by chenyao0913 on 2016/3/30.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import storePro from '../store/storePro';
import ProApp from './ProApp';

import {Row,Col} from 'antd';

const store = storePro();

export default class ProRoot extends Component {
  render() {
    return (
      <Provider store={store}>
        <ProApp />
      </Provider>
    )
  }
}
