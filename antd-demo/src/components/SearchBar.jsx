/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, {Component, PropTypes} from 'react';
import {Select, Form, Input, Button, Row, Col} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const SearchBar = React.createClass({

    handleSubmit(e) {
        e.preventDefault();
        // onSubmit();
        var searchObj = this.props.form.getFieldsValue();
        console.log(searchObj);
        // this.props.onSubmit(searchObj);
    },

    render() {

      const {onSubmit} = this.props;
      const {getFieldProps} = this.props.form;

      const ops = [{
        value: "all",
        name: "全部"
      }, {
        value: "car",
        name: "车险"
      }, {
        value: "travel",
        name: "国内旅行保险"
      }];


      return ( <Form inline onSubmit={this.handleSubmit} >
        <FormItem label="产品ID:">
            <Input placeholder="请输入id"  {...getFieldProps("pid")} />
        </FormItem> 
        <FormItem label = "产品主分类:" >
            <Select style={{width:120}} {...getFieldProps("mainCat")}>
                {ops.map(option => 
                    <Option value={option.value} key={option.value}>{option.name}</Option>
                )}
            </Select> 
        </FormItem>   
         <Button type="primary" htmlType="submit" > 确定 </Button>  
        </Form >
      );
    }
});

export default Form.create()(SearchBar);