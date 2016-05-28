import React, { Component, PropTypes } from 'react';
import { Button, Row, Col } from 'antd';

class Footer extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_COMPLETED',
      'SHOW_ACTIVE',
    ]).isRequired,
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

        {this.renderFilter('SHOW_COMPLETED', '结束')}

        {this.renderFilter('SHOW_ACTIVE', '待办')}
        </Col>
      </Row>
    );
  }
}
export default Footer;
