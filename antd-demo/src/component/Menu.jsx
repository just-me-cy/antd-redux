import React from 'react';
import { Menu, Icon } from 'antd';

import { Router, Route, Link,browserHistory } from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: 'product'
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key
    });
    //if(e.key === '4'){
    //  browserHistory.pushState(null,'inbox/messages/1');//通过pushState也可以控件跳转
    //}

  },
  render() {
    return (
      <Menu
            onClick={this.handleClick}
            style={{ width: '100%' }}
            defaultOpenKeys={['sub1','showForm']}
            selectedKeys={[this.state.current]}
            mode="inline">
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
          <MenuItemGroup title="控件">
            <Menu.Item key="showDatePicker"><Link to='/showDatePicker'>时间控件</Link></Menu.Item>
            <Menu.Item key="showForm"><Link to='/myForm'>表单控件</Link></Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="reduxDemo">
            <Menu.Item key="3"><Link to='/inbox/messages/1'>inbox</Link></Menu.Item>
            <Menu.Item key="appTodo"><Link to='/appTodo'>AppTodo</Link></Menu.Item>
            <Menu.Item key="redit"><Link to='/reddit'>reddit</Link></Menu.Item>
            <Menu.Item key="product"><Link to='/product'>product</Link></Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
          <Menu.Item key="5">选项5</Menu.Item>
          <Menu.Item key="6">选项6</Menu.Item>
          <SubMenu key="sub3" title="三级导航">
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
          <Menu.Item key="9">选项9</Menu.Item>
          <Menu.Item key="10">选项10</Menu.Item>
          <Menu.Item key="11">选项11</Menu.Item>
          <Menu.Item key="12">选项12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
});
export default Sider;
