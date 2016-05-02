/**
 * 产品列表搜索功能
 */
import React, { PropTypes } from 'react';
import { Select, Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component {
  static propTypes = {
    doSearch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchObj = this.props.form.getFieldsValue();
    this.props.doSearch(searchObj);
  }

  render() {
    const { getFieldProps } = this.props.form;

    const ops = [{
      value: 'all',
      name: '全部',
    }, {
      value: 'health',
      name: '健康保险',
    }, {
      value: 'travel',
      name: '国内旅行保险',
    }];

    return (
      <Form inline onSubmit={this.handleSubmit} >
      <FormItem label="产品ID:">
          <Input placeholder="请输入id" {...getFieldProps('pid')} />
      </FormItem>
      <FormItem label = "产品主分类:" >
          <Select style={{ width: 120 }} {...getFieldProps('mainCata')}>
              {ops.map(option =>
                  <Option value={option.value} key={option.value}>{option.name}</Option>
              )}
          </Select>
      </FormItem>
       <Button type="primary" htmlType="submit" > 确定 </Button>
      </Form>
    );
  }
}

export default Form.create()(SearchBar);
