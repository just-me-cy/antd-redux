import React, { PropTypes } from 'react';
import { Table, Icon, Button, Form, Input } from 'antd';
import Box from '../Box';

const FormItem = Form.Item;



const tableDatas = [{}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll(selected, selectedRows, changeRows) {
    console.log(selected, selectedRows, changeRows);
  },
};

export default class EditableTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.addHandle = this.addHandle.bind(this);
    this.rowClick = this.rowClick.bind(this);
    this.state = {
      data: tableDatas,
    };
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
  }

  validate() {
    // const rs = this.state.data;
    // rs.map(item => {
    //   if (item.key) {
    //     return !!item.name ? true :false ;      
    //   }
    // });
    return true;
  }

  rowClick(record, index) {
    console.log(record, index);
  }


  addHandle() {
    tableDatas.push({
      key: '2',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    });
    // tableDatas.push({});
    this.setState({ data: tableDatas });

    console.log(this.state.data);
  }

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render(text) {
        return (       
            <Input type="text" placeholder="请输入姓名" value={text} onChange={(e) => {
                console.log(e);
                // this.setState({data[0].name:"chenyao"});
            }}
            />
          );
      },
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render(text) {
        return (
          <FormItem
            required
          >
            <Input type="number" placeholder="请输入年龄" value={text} />
          </FormItem>);
      },
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      render(text) {
        return (
          <FormItem
            label="住址"
            required
          >
            <Input type="text"  placeholder="请输入住址" value={text} />
          </FormItem>);
      
      },
    }, {
      title: '操作',
      width: 150,
      key: 'operation',
      render(text, record, index) {
        return (
         <div>
           <Button type="ghost" style={{ marginRight: 10 }} size="small" onClick={(e) => {
            console.log('del',index);
           }}>删除</Button>
           <Button type="ghost" size="small" onClick={(e)=>{
            console.log('edit');
           }}>保存</Button>
         </div>
        );
      },
    }];

    return (
      <div>
        <Button type="primary" onClick={this.addHandle}>添加行</Button>
        <Table columns={columns} dataSource={this.state.data} pagination={false}
        size="middle" bordered="true" onRowClick={this.rowClick} />
      </div>
    );
  }
}
