import React, { PropTypes } from 'react';
import { Form } from 'antd';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomTable from '../common/customTable/CustomTable';

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
      validateWrap: {
        getFieldProps,
        validateFieldsAndScroll,
        editType: 'text',
        allowEdited: true,
        rules: { baseRules: ['required'], funcs: ['postcode'] },
      },
    }, {
      key: 'content',
      title: '内容',
      dataIndex: 'content',
      validateWrap: {
        validateFieldsAndScroll,
        getFieldProps,
        editType: 'text',
        allowEdited: true,
        rules: { baseRules: ['required'], funcs: ['userExists'] },
      },
    }, {
      key: 'power',
      title: '权重',
      dataIndex: 'power',
      width: 100,
      validateWrap: {
        defaultData: 1,
        validateFieldsAndScroll,
        getFieldProps,
        editType: 'InputNumber',
        allowEdited: true,
        min: 1, // 对于inputNumber类型，必须设置 最小值和最大值 作为默认的验证
        max: 10,
      },
    }, {
      key: 'operation',
      dataIndex: 'operation',
      title: '操作',
      width: 150,
      validateWrap: {
        validateFieldsAndScroll,
        editType: 'text',
        allowEdited: false,
      },
    }];

    return (
      <CustomTable tableTitle="我可以设置" columns={columns} dataSource={[{ title: '111111', content: 'asdf', power: 1, key: 'qwer-1111-1110-1111' }]} />
    );
  }
}

Notice = Form.create({})(Notice);
export default Notice;
