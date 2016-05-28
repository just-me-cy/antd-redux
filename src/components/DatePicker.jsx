import React, { Component } from 'react';
import { DatePicker, message } from 'antd';

class showDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    message.info(`您选择的日期是:${value.toString()}`);
    this.setState({ date: value });
  }
  render() {
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={this.handleChange} />
      </div>
    );
  }
}

export default showDatePicker;
