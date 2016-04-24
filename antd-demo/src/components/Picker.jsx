/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, { Component, PropTypes } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <div>
      <Select defaultValue={value} style={{ width: 120 }} onChange={value => onChange(value)}>
        {options.map(option =>
            <Option value={option} key={option}>{option}</Option>
          )
        }
      </Select>
    </div>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
