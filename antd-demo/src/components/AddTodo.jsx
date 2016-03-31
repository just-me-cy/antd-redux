import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';
import { Button,Row, Col, Input,Form  } from 'antd';

const FormItem = Form.Item;

const AddTodo  = React.createClass({

  handleSubmit(e) {
    e.preventDefault();
    let todoItem = this.props.form.getFieldValue("toDoItem");
    console.log('收到表单值：',todoItem );
    this.props.onAddClick(todoItem);
    this.props.form.resetFields();
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form line onSubmit={this.handleSubmit}>

        <FormItem label='请输入待办事项：' labelCol={{span:6}} wrapperCol={{ span: 8 }}>
            <Input  {...getFieldProps('toDoItem')}  placeholder='输入待办事项' />
        </FormItem>

        <Button type="primary" htmlType="submit" style={{marginLeft:10}}>Add</Button>
      </Form>
    );
  }

});

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
export default Form.create()(AddTodo);
