/**
 * Created by chenyao on 2016/5/6.
 */
import React, { PropTypes } from 'react';
import { Button, Form, Input } from 'antd';
import Box from '../Components/Box';
import Notice from '../Components/Notice';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onNoticeAdd, onNoticeDel, onNoticeSave, onNoticeEdit } from '../actions/notice';

const FormItem = Form.Item;

class FormDemo extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('%%%', this.props.notices.toJS());
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!', errors, values);
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  render() {
    const { getFieldProps } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [{ required: true, message: '请输入姓名' }],
    });
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 4 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <Box title="表格填写">
          <FormItem
            {...formItemLayout}
            label="姓名："
          >
             <Input {...nameProps} />
          </FormItem>
        </Box>
        <Notice {...this.props} />
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
    notices: state.notices,
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
