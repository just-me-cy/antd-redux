/**
 * 产品列表过滤组件
 */
import React, { Component, PropTypes } from 'react';
import { Button, Row, Col } from 'antd';

export default class FilterBar extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_SHELVE',
      'SHOW_OFF_SHELVE',
      'SHOW_NEW',
      'SHOW_CONFIRM',
      'SHOW_CHANGE',
      'SHOW_OUT_OF_SALE',
    ]).isRequired,
  }

  constructor(props) {
    super(props);
    this.renderFilter = this.renderFilter.bind(this);
  }

  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return <Button type="primary" size="small" style={{ marginRight: 5 }}>{name}</Button>;
    }

    return (
      <Button size="small" style={{ marginRight: 5 }} onClick={e => {
        e.preventDefault();
        this.props.onFilterChange(filter);
      }}
      >
        {name}
      </Button>
    );
  }

  render() {
    return (
      <Row style={{ marginTop: 20 }} >
        <Col span="14" push="6">
        显示：
        {this.renderFilter('SHOW_ALL', '全部')}
        {this.renderFilter('SHOW_SHELVE', '上架')}
        {this.renderFilter('SHOW_OFF_SHELVE', '下架')}
        {this.renderFilter('SHOW_NEW', '新建')}
        {this.renderFilter('SHOW_CONFIRM', '确认')}
        {this.renderFilter('SHOW_CHANGE', '修改')}
        {this.renderFilter('SHOW_OUT_OF_SALE', '停售')}
        </Col>
      </Row>
    );
  }
}
