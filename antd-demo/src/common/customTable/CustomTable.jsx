import { Table, Form, Input, Row, Col,  Button, InputNumber, Icon } from 'antd';
import React, { PropTypes } from 'react';
import Box from '../../components/Box';
import validateRules from '../validateRules';
import { guid } from '../uuid';


/* eslint no-console:"off" */
/* eslint no-param-reassign:"off" */
/* eslint prefer-const:"off" */
const FormItem = Form.Item;
class CustomTable extends React.Component {
  static propTypes = {
    columns: PropTypes.array,
    tableTitle: PropTypes.string,
    dataSource: PropTypes.array,
  }

  static defaultProps = {
    columns: [],
    dataSource: [],
    tableTitle: '标题',
  }

  constructor(props) {
    super(props);
    this.addLine = this.addLine.bind(this);
    this.submitTable = this.submitTable.bind(this);
    const { dataModel, editCols, dataSource } = this.setData();
    console.log('init转换后数据', dataSource);
    this.state = {
      columns: this.setColConfig(),
      dataSource,
      dataModel,
      editCols,
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.columns !== nextProps.columns) {
      return true;
    }
    return false;
  }

  // 单个cell验证并提交
  onValidate(cb, e, key, dataIndex) {
    cb([e.target.id], (errors, values) => {
      if (errors) {
        // 验证没有通过
        // console.log('表格单元验证未通过');
        return;
      }
      this.setState(() => {
        this.state.dataSource.map(item => {
          if (item.key === key) {
            item[dataIndex] = values[`${dataIndex}_${key}`];
            item[`${dataIndex}_editing`] = 0;// 处于查看状态
            let count = 0;
            this.state.editCols.map((editItem) => {
              count += item[`${editItem}_editing`];
            });
            item.lineEditing = count;
          }});
      });
    });
  }

  // 表格每行验证提交
  onValidateLine(cb, arr, key) {
    cb(arr, (errors, values) => {
      if (errors) {
        // 验证没有通过
        // console.log('表格行验证未通过');
        return;
      }
      this.setState(() => {
        const data = this.state.dataSource;
        const curRowIdx = data.findIndex(rowItem => {
          return rowItem.key === key;
        });
        const curRow = data[curRowIdx];
        curRow.lineEditing = 0;
        arr.map(item => {
          const inputVal = values[item]; // 要更新的值
          const colName = item.split('_')[0]; // 要更新的colName
          curRow[colName] = inputVal;
          curRow[`${colName}_editing`] = 0;
        });
      });
    });
  }

  // 初始化数据，得到数据模型
  setData() {
    const columns = this.props.columns;
    let dataArr = [];
    let obj = { lineEditing: 1, key: 0 };
    // 初始化需要编辑的columns
    let editArr = [];
    columns.map(item => {
      if (item.validateWrap.allowEdited) {
        obj[item.dataIndex] = item.validateWrap.defaultData || '';
        obj[`${item.dataIndex}_editing`] = 1;
        editArr.push(item.dataIndex);
      } else {
        obj[item.dataIndex] = item.title;
      }
    });
    let datas = this.props.dataSource;
    // 数据转换
    datas.map(item => {
      let model = Object.assign({}, obj);
      Object.keys(item).map(itemKey => {
        model[itemKey] = item[itemKey];
        model[`${itemKey}_editing`] = 0;
        model.lineEditing = 0;
      });
      dataArr.push(model);
    });
    return { editCols: editArr, dataModel: obj, dataSource: dataArr };
  }

  // 初始化重新生成行配置
  setColConfig() {
    const columns = [...this.props.columns];
    columns.map(item => {
      const colName = item.dataIndex;
      item.render = (text, record, index) => {
        if (colName === 'operation') {
          return (
            <span>
              <Button
                type="ghost"
                size="small"
                onClick={() => {
                  this.delRow(index);
                }}
                style={{ marginRight: 5 }}
              >
                删除
              </Button>
              {!!record.lineEditing ||
              <Button
                type="ghost"
                size="small"
                onClick={() => {
                  this.editLine(record.key);
                }}
                style={{ marginRight: 5 }}
              >
                修改
              </Button>}

              {!record.lineEditing ||
              <Button
                type="ghost"
                size="small"
                onClick={() => {
                  // 设置需要验证的inputId
                  let arr = [];
                  this.state.editCols.filter(editItem => {
                    if (record[`${editItem}_editing`]) {
                      arr.push(`${editItem}_${record.key}`);
                    }
                  });
                  this.onValidateLine(item.validateWrap.validateFieldsAndScroll, arr, record.key);
                }
              }
                style={{ marginRight: 5 }}
              >
                保存
              </Button>}
            </span>
          );
        }
        const isEditing = record[`${colName}_editing`];// 是处于编辑状态编辑
        // debugger;
        const canEditing = this.state.editCols.findIndex((colItem) => { return colItem === colName; }) !== -1;
        return canEditing ? this.render4Type(item.validateWrap, record.key, colName, text, isEditing) : (<span>{text}</span>);
      };
    });
    return columns;
  }

  // 设置每个单元格的id，便于单个操作
  setInputId(index, dataIndex) {
    return `${dataIndex}_${index}`;
  }

  // 每个cell设置验证规则
  // TODO: radio checkbox select
  setValidation(callback) {
    // debugger;
    return (id, initVal, rules = {}) => {
      let compositeRules = [];
      if (rules.baseRules) {
        rules.baseRules.map(item => compositeRules.push(validateRules.baseRules[item]));
      }
      if (rules.funcs) {
        rules.funcs.map(item => compositeRules.push({ validator: validateRules[item] }));
      }
      return callback && callback(id, { initialValue: initVal, rules: compositeRules });
    };
  }

  // 添加新行
  addLine() {
    // 根据colums取数据
    let data = this.state.dataSource;
    let model = Object.assign({}, this.state.dataModel);
    model.key = guid();
    this.setState(() => {
      this.state.dataSource.push(model);
    });
    console.log('add new line', this.state.dataSource);
  }

  // 启动整行编辑
  editLine(key) {
    this.setState(() => {
      this.state.dataSource.map(item => {
        if (item.key === key) {
          item.lineEditing = 1;
          for (const itemCol of this.state.editCols) {
            item[`${itemCol}_editing`] = 1;
          }
        }
      });
    });
  }

  // 单个cell进入编辑状态
  editCell(key, dataIndex) {
    this.setState(() => {
      this.state.dataSource.map(item => {
        if (item.key === key) {
          item.lineEditing = 1;
          item[`${dataIndex}_editing`] = 1;
        }
      });
    });
  }

  // 删除一行
  delRow(index) {
    this.setState({ dataSource: this.state.dataSource.filter((item, idx) => (idx !== index)) });
  }

  // 以行为最小单位从dataSource中提取已保存的数据
  submitTable() {
    const data = [...this.state.dataSource];
    let submitData = [];
    data.map(rowItem => {
      if (!rowItem.lineEditing) {
        // 只提交单行处于已保存状态的数据行
        const obj = { key: rowItem.key };
        this.state.editCols.map(editItem => {
          obj[editItem] = rowItem[editItem];
        });
        submitData.push(obj);
      }
    });
    console.log('submit', this.state.dataSource, submitData);
  }

  // 渲染编辑状态单元格
  render4Type(validateWrap, key, dataIndex, text, isEditing) {
    // debugger;
    const id = this.setInputId(key, dataIndex);
    if (!isEditing) {
      // 非编辑状态，可以双击启动当前cell进入编辑状态
      return (
        <div
          style={{ cursor: 'pointer' }}
          title="双击开始编辑"
          onDoubleClick={() => {
            this.editCell(key, dataIndex);
          }}
        >{text}</div>
      );
    }
    switch (validateWrap.editType) {
      // 渲染文本框
      case 'text':
        return (
          <FormItem>
            <Input
              key={id}
              onBlur={(e) => {this.onValidate(validateWrap.validateFieldsAndScroll, e, key, dataIndex); }}
              // onChange={(e) => { this.onValidate(e, index, dataIndex);}}
              {...this.setValidation(validateWrap.getFieldProps)(id, text, validateWrap.rules || [])}
              type="text"
            />
          </FormItem>
          );
      case 'InputNumber':
        // 渲染数字输入框
        return (
          <FormItem>
            <InputNumber
              key={id}
              min={validateWrap.min}
              max={validateWrap.max}
              onBlur={(e) => {this.onValidate(validateWrap.validateFieldsAndScroll, e, key, dataIndex); }}
              {...this.setValidation(validateWrap.getFieldProps)(id, text, validateWrap.rules || [])}
            />
          </FormItem>
          );
      default:
        return (<div>其它输入类型</div>);
    }
  }

  render() {
    return (
      <Box title={this.props.tableTitle}>
        <Row>
          <Col span="12">
            <Button type="primary" onClick={this.addLine}>
              <Icon type="plus-circle-o" />新增行
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} bordered />
          </Col>
        </Row>
         <Row>
          <Col span="12">
            <Button type="primary" onClick={this.submitTable}>
              <Icon type="plus-circle-o" />提交
            </Button>
          </Col>
        </Row>
      </Box>
    );
  }
}

export default CustomTable;

