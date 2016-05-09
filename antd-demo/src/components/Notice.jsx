import React, { PropTypes } from 'react';
import { Table, Icon, Input, InputNumber, Button, Row, Col, Form, Modal } from 'antd';
import Box from '../components/Box';
import ImmutablePropTypes from 'react-immutable-proptypes';

const FormItem = Form.Item;


class Notice extends React.Component {
  static propTypes = {
    onNoticeAdd: PropTypes.func.isRequired,
    onNoticeSave: PropTypes.func.isRequired,
    onNoticeDel: PropTypes.func.isRequired,
    onNoticeEdit: PropTypes.func.isRequired,
    notices: ImmutablePropTypes.list.isRequired,
  }
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log('提交');
    // this.props.form.validateFieldsAndScroll(['title', 'content', 'power'], (errors, value) => {
    //   if (!!errors) {
    //     console.log('pop error', value);
    //     this.props.form.resetFields();
    //     return;
    //   }
    //   console.log('ok--', value);
    //   this.props.changeVisible({ isVisible: false });
    //   this.props.onNoticeAdd({ ...value, index: this.props.notices.length });
    //   this.props.form.resetFields();
    // });
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
    const { onNoticeAdd, onNoticeSave, onNoticeDel, onNoticeEdit, notices } = this.props;

    const columns = [{
      key: 'title',
      title: '标题',
      dataIndex: 'title',
      width: 160,
      render(text, record, index) {
        console.log('##', record, index);
        if (record.editing) {
          // 编辑状态
          return (
              <Input defaultValue={record.title} onBlur={(e) => {
                console.log(e.target.value);
                record.title = e.target.value;
              }}
              />
            );
        }
          // 非编辑
        return text;
      },
    }, {
      key: 'content',
      title: '内容',
      dataIndex: 'content',
      render(text, record, index) {
        if (record.editing) {
          return (
            <Input type="textarea" defaultValue={record.content} onBlur={(e) => {
              record.content = e.target.value;
            }}
            />
          );
        }
        return text;
      },
    }, {
      key: 'power',
      title: '权重',
      dataIndex: 'power',
      width: 100,
      render(text, record, index) {
        if (record.editing) {
          return (
            <InputNumber min={1} max={99} defaultValue={record.power} onBlur={(e) => {
              record.power = e.target.value;
            }}
            />
          );
        }
        return text;
      },
      sorter: (a, b) => (a.power || 0) - (b.power || 0),
    }, {
      key: 'operation',
      title: '操作',
      width: 150,
      render(text, record, index) {
        return (
          <span>
            <Button type="ghost" size="small" onClick={() => {
              onNoticeDel({ index });
            }} style={{ marginRight: 5 }}
            >
              删除
            </Button>
            {record.editing ||
            <Button type="ghost" size="small" onClick={() => {
              console.log('##record', record);
              onNoticeEdit({ index, ...record });
            }} style={{ marginRight: 5 }}
            >
              修改
            </Button>}

            {!record.editing ||
            <Button type="ghost" size="small" onClick={() => {
              console.log('##保存', record);
              onNoticeSave({ ...record, index });
            }} style={{ marginRight: 5 }}
            >
              保存
            </Button>}
      </span>
        );
      },
    }];

    return (
      <Box title="投保须知">
        <Row>
          <Col span="12">
            <Button type="primary" onClick={() => {
              onNoticeAdd({ editing: true, title: '', content: '', power: 1 });
            }}
            >
              <Icon type="plus-circle-o" />新增行
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table columns={columns} dataSource={notices.toArray()} pagination={false} />
          </Col>
        </Row>
      </Box>
    );
  }
}
export default Notice;
