/**
 * 产品列表table组件
 */
import React, { Component } from 'react';
import { Table, Button } from 'antd';
import './ProductLists.less';
import ImmutablePropTypes from 'react-immutable-proptypes';

const columns = [{
  title: '产品ID',
  dataIndex: 'id',
  key: 'id',
  className: 'alignCenter',
  render(text) {
    return <a href="#">{text}</a>;
  },
}, {
  title: '产品名称',
  dataIndex: 'name',
  className: 'alignCenter',
  key: 'name',
}, {
  title: '产品主分类',
  dataIndex: 'mainCata',
  className: 'alignCenter',
  key: 'mainCata',
}, {
  title: '添加时间',
  dataIndex: 'addTime',
  className: 'alignCenter',
  key: 'addTime',
}, {
  title: '产品状态',
  dataIndex: 'status',
  className: 'alignCenter',
  key: 'status',
}, {
  title: '操作',
  key: 'op',
  className: 'alignCenter',
  render(text, record) {
    return (
      <div>
        {record.op.map((item, index) => (<Button key={index} size="small" style={{ marginRight: 5 }}>{item}</Button>))}
      </div>
    );
  },
}];


export default class ProductLists extends Component {
  static propTypes = {
    pros: ImmutablePropTypes.list.isRequired,
  }
  render() {
    return (
      <Table columns={columns} dataSource={this.props.pros.toJS()} />
    );
  }
}
