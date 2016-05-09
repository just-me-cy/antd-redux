import React, { PropTypes } from 'react';
import { Button, Form, Select, Radio, Checkbox, Cascader, InputNumber, DatePicker, Input } from 'antd';
import Box from '../Components/Box';
import Notice from '../Components/Notice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onNoticeAdd, onNoticeDel, onNoticeSave, onNoticeEdit } from '../actions/notice';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.form.getFieldInstance('mytable'));
    this.props.form.validateFieldsAndScroll(['primeNumber'],(errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!', errors, values);
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  }

  checkPrime(rule, value, callback) {
    if (value !== 11) {
      callback(new Error('8~12之间的质数明明是11啊!'));
    } else {
      callback();
    }
  }


  render() {
    const address = [{
      value: 'zhejiang',
      label: '浙江',
      children: [{
        value: 'hangzhou',
        label: '杭州',
      }],
    }];

    const { getFieldProps } = this.props.form;

    const primeNumberProps = getFieldProps('primeNumber', {
      rules: [{ validator: this.checkPrime }],
    });
  
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form horizontal>
        <Box title="投保须知">
          <FormItem
            {...formItemLayout}
            label="投保须知编辑："
            required
          >
              <InputGroup>
                <InputNumber {...primeNumberProps} min={8} max={12} />
                <Notice {...getFieldProps('mytable')} {...this.props} />
              </InputGroup>
          </FormItem>
        </Box>
        <FormItem
          wrapperCol={{ span: 12, offset: 7 }}
        >
          <Button type="primary" onClick={this.handleSubmit} style={{ marginRight: 10 }}>确定</Button>
          <Button type="ghost" onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  // debugger;
  return {
    notices: state.noticeReducer.notices,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNoticeAdd: bindActionCreators(onNoticeAdd, dispatch),
    onNoticeDel: bindActionCreators(onNoticeDel, dispatch),
    onNoticeSave: bindActionCreators(onNoticeSave, dispatch),
    onNoticeEdit: bindActionCreators(onNoticeEdit, dispatch),
  };
}

FormDemo = Form.create({})(FormDemo);
export default connect(mapStateToProps, mapDispatchToProps)(FormDemo);
