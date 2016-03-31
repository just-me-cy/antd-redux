/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, { Component, PropTypes } from 'react';
import { Select, Form, Input, Button, Row, Col} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const SearchBar = React.createClass({

  render(){

    const { onSubmit } = this.props;
    // const { getFieldProps} = this.props.form;
  const ops = [{value:"all",name:"全部"},{value:"car",name:"车险"},{value:"travel",name:"国内旅行保险"}];    
  return (<Form inline onSubmit={e => {e.preventDefault();onSubmit(getFieldsValue())}}>
    <FormItem label="产品ID:">
          <Input placeholder="请输入id"  />
    </FormItem>

    <FormItem label="产品主分类:">
          <Select style={{width:120}}>
            {ops.map(option => 
                <Option value={option.value} key={option.value}>{option.name}</Option>
              )}
          </Select>
    </FormItem>
        <Button type="primary" htmlType="submit">确定</Button>
  </Form>);
  }

});

// SearchBar.propTypes = {
//   options: PropTypes.arrayOf(
//     PropTypes.string.isRequired
//   ).isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired
// }

export default Form.create()(SearchBar);