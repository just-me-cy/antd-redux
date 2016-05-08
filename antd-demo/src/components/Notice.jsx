import React, { PropTypes } from 'react';
import { Table, Icon, Input, InputNumber, Button, Row, Col, Form, Modal } from 'antd';
import Box from '../components/Box';

const FormItem = Form.Item;
class Notice extends React.Component {
  static propTypes = {
    onNoticeAdd: PropTypes.func.isRequired,
    onNoticeDel: PropTypes.func.isRequired,
    onNoticeChange: PropTypes.func.isRequired,
    changeVisible: PropTypes.func.isRequired,
    noticeEdit: PropTypes.func.isRequired,
    notices: PropTypes.array.isRequired,
    editItem: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    // console.log(this.props.form.getFieldsValue());
    // this.changeVisible({ isVisible: false });
    this.props.form.validateFieldsAndScroll(['title', 'content', 'power'], (errors, value) => {
      if (!!errors) {
        console.log('pop error', value);
        this.props.form.resetFields();
        return;
      }
      console.log('ok--', value);
      this.props.changeVisible({ isVisible: false });
      this.props.onNoticeAdd( value );
      this.props.form.resetFields();
    });
  }
  titleExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'ab') {
          callback([new Error('该标题已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  render() {
    const { onNoticeAdd, onNoticeDel, onNoticeChange, changeVisible, notices, isVisible, noticeEdit, editItem } = this.props;
    const { getFieldProps, validateFieldsAndScroll } = this.props.form;
    const titleProps = getFieldProps('title', {
      rules: [
        { required: true, min: 2, message: '标题至少为 2 个字符' },
        { validator: this.titleExists },
      ],
    });
    const contentProps = getFieldProps('content', {
      rules: [
        { required: true, message: '内容为必填项' },
      ],
    });
    const columns = [{
      key: 'title',
      title: '标题',
      dataIndex: 'title',
      width: 160,
      // render(text, record, index) {
      //   return (
      //     <FormItem
      //       required
      //     >
      //       <Input id="title" onChange={(e) => onNoticeChange({ key: 'title', value: e.target.value, index })} />
      //     </FormItem>
      //     );
      // },
    }, {
      key: 'content',
      title: '内容',
      dataIndex: 'content',
      // render(text, record, index) {
      //   return <Input type="textarea" onChange={(e) => onNoticeChange({ key: 'content', value: e.target.value, index })} />;
      // },
    }, {
      key: 'power',
      title: '权重',
      dataIndex: 'power',
      width: 100,
      // render(text, record, index) {
      //   return <InputNumber min={1} max={99} defaultValue={record.power} onChange={(value) => onNoticeChange({ key: 'power', value, index })} />;
      // },
      // sorter: (a, b) => (a.power || 0) - (b.power || 0),
    }, {
      key: 'operation',
      title: '操作',
      width: 150,
      render(text, record, index) {
        return (
          <span>
            <Button type="ghost" size="small" onClick={() => onNoticeDel({ index })} style={{ marginRight: 5 }}>
              删除
            </Button>
            <Button type="ghost" size="small" onClick={() => {
              changeVisible({ isVisible: true });
              console.log('##record', record);
              noticeEdit({ ...record });
            }} style={{ marginRight: 5 }}
            >
              修改
            </Button>
      </span>
        );
      },
    }];
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    return (
      <Box title="投保须知">
        <Row>
          <Col span="12">
            <Button type="primary" onClick={onNoticeAdd}>
              <Icon type="plus-circle-o" />新增
            </Button>
            <Button type="primary" onClick={(e) => {
              changeVisible({ isVisible: true });
            }}
            >
              <Icon type="plus-circle-o" />弹出
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table columns={columns} dataSource={notices} pagination={false} />      
          </Col>
        </Row>
        <Row>
          <Modal title="添加需知" visible={isVisible} onCancel={(e) => {
            changeVisible({ isVisible: false });
            this.props.form.resetFields();
          }} onOk={this.onSubmit}
          >
            <Form horizontal form={this.props.form}>
              <FormItem
                label="标题："
                {...formItemLayout}
              >
                <Input type="text" {...titleProps} defaultValue={editItem.title || ''} />
              </FormItem>
              <FormItem
                label="内容："
                required
                {...formItemLayout}
              >
                <Input type="text" {...contentProps} defaultValue={editItem.content || ''} />
              </FormItem>
              <FormItem
                label="权重："
                required
                {...formItemLayout}
              >
                <InputNumber {...getFieldProps('power')} min={1} max={10} defaultValue={editItem.content || ''} />
              </FormItem>
            </Form>
          </Modal>
        </Row>
      </Box>
    );
  }
}
Notice = Form.create({})(Notice);
export default Notice;
