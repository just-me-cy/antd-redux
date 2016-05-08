import React, { PropTypes } from 'react';
import { Button, Form, Select, Radio, Checkbox, Cascader, InputNumber, DatePicker, Input } from 'antd';
import Box from '../Components/Box';
import Notice from '../Components/Notice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onNoticeAdd, onNoticeDel, onNoticeChange, changeVisible, noticeEdit } from '../actions/notice';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class FormDemo extends React.Component {
  static propTypes = {
    // form: PropTypes.object.isReuired,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.props.form.getFieldInstance('mytable'));
    this.props.form.validateFieldsAndScroll(['primeNumber'],(errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!', errors, values);
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
    // console.log(this.props.form.getFieldsValue());
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

    // const selectProps = getFieldProps('select', {
    //   rules: [
    //     { required: true, message: '请选择您的国籍' },
    //   ],
    // });

    // const multiSelectProps = getFieldProps('multiSelect', {
    //   rules: [
    //     { required: true, message: '请选择您喜欢的颜色', type: 'array' },
    //   ],
    // });

    // const radioProps = getFieldProps('radio', {
    //   rules: [
    //     { required: true, message: '请选择您的性别' },
    //   ],
    // });

    // const birthdayProps = getFieldProps('birthday', {
    //   rules: [
    //     {
    //       required: true,
    //       type: 'date',
    //       message: '你的生日是什么呢?',
    //     }, {
    //       validator: this.checkBirthday,
    //     },
    //   ],
    // });

    const primeNumberProps = getFieldProps('primeNumber', {
      rules: [{ validator: this.checkPrime }],
    });
    // const addressProps = getFieldProps('address', {
    //   rules: [{ required: true, type: 'array' }],
    // });
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
  return {
    notices: state.noticeReducer.notices,
    isVisible: state.noticeReducer.isVisible,
    editItem: state.noticeReducer.editItem,
    // formSubmit: formSubmitSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onNoticeAdd: bindActionCreators(onNoticeAdd, dispatch),
    onNoticeDel: bindActionCreators(onNoticeDel, dispatch),
    onNoticeChange: bindActionCreators(onNoticeChange, dispatch),
    changeVisible: bindActionCreators(changeVisible, dispatch),
    noticeEdit: bindActionCreators(noticeEdit, dispatch),
    // onSubmit: bindActionCreators(onSubmit, dispatch),
  };
}

FormDemo = Form.create({})(FormDemo);
export default connect(mapStateToProps, mapDispatchToProps)(FormDemo);
