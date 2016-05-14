import React, { PropTypes } from 'react';
import { Table, Icon, Input, InputNumber, Button, Row, Col, Form } from 'antd';
import Box from '../components/Box';
import ImmutablePropTypes from 'react-immutable-proptypes';
// import validateRules from '../common/validateRules';
import { setValidation } from '../common/setValidation';

const FormItem = Form.Item;

class Notice extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onNoticeAdd: PropTypes.func.isRequired,
    onNoticeSave: PropTypes.func.isRequired,
    onNoticeDel: PropTypes.func.isRequired,
    onNoticeEdit: PropTypes.func.isRequired,
    notices: ImmutablePropTypes.list.isRequired,
  }
  render() {
    const { onNoticeAdd, onNoticeSave, onNoticeDel, onNoticeEdit, notices } = this.props;
    const { getFieldProps, validateFieldsAndScroll } = this.props.form;
    const columns = [{
      key: 'title',
      title: '邮政编码',
      dataIndex: 'title',
      width: 160,
      render(text, record) {
        if (record.editing) {
          // 编辑状态
          const cellId = `${record.key}-title`;
          return (
            <FormItem>
              <Input {...setValidation(getFieldProps)(cellId, record.title, { baseRules: ['required'], funcs: ['postcode'] })} />
            </FormItem>
            );
        }
        // 非编辑
        return (<span style={{ cursor: 'pointer' }} onDoubleClick={ () => { onNoticeEdit({ ...record }); }}>{text}</span>);
      },
    }, {
      key: 'content',
      title: '内容',
      dataIndex: 'content',
      render(text, record) {
        const cellId = `${record.key}-content`;
        if (record.editing) {
          return (
            <FormItem>
              <Input {...setValidation(getFieldProps)(cellId, record.content, { baseRules: ['required'], funcs: ['userExists'] })} type="textarea" />
            </FormItem>
          );
        }
        return (<span style={{ cursor: 'pointer' }} onDoubleClick={ () => { onNoticeEdit({ ...record }); }}>{text}</span>);
      },
    }, {
      key: 'power',
      title: '权重',
      dataIndex: 'power',
      width: 100,
      render(text, record) {
        const cellId = `${record.key}-power`;
        if (record.editing) {
          return (
            <InputNumber min={1} max={10} {...setValidation(getFieldProps)(cellId, record.power)} />
          );
        }
        return (<span style={{ cursor: 'pointer' }} onDoubleClick={ () => { onNoticeEdit({ ...record }); }}>{text}</span>);
      },
      sorter: (a, b) => (a.power || 0) - (b.power || 0),
    }, {
      key: 'operation',
      title: '操作',
      width: 150,
      render(text, record) {
        return (
          <span>
            <Button
              type="ghost"
              size="small"
              onClick={() => {
                onNoticeDel({ key: record.key });
              }}
              style={{ marginRight: 5 }}
            >
              删除
            </Button>
            {record.editing ||
            <Button
              type="ghost"
              size="small"
              onClick={() => {
                onNoticeEdit({ ...record });
              }}
              style={{ marginRight: 5 }}
            >
              修改
            </Button>}

            {!record.editing ||
            <Button
              type="ghost"
              size="small"
              onClick={() => {
                const rowKey = record.key;
                validateFieldsAndScroll([`${rowKey}-title`, `${rowKey}-content`, `${rowKey}-power`],
                  (errors, values) => {
                    if (errors) {
                      console.log('cell填写有误', values, errors);
                      return;
                    }
                    // dispatch编辑后的数据
                    onNoticeSave({ key: rowKey, title: values[`${rowKey}-title`], content: values[`${rowKey}-content`], power: values[`${rowKey}-power`] });
                  });
              }}
              style={{ marginRight: 5 }}
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

Notice = Form.create({})(Notice);
export default Notice;
