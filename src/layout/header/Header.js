import React, { PropTypes } from 'react';
import { Icon, Menu } from 'antd';
import './Header.less';

const SubMenu = Menu.SubMenu;

export default class Header extends React.Component {

  static propTypes = {
    user: PropTypes.object,
  };

  handleClick = () => {

  };

  render() {
    const { user } = this.props;
    return (
      <div className="ant-layout-header">
        <div className="header-navbar">
          <Menu className="header-menu" onClick={this.handleClick} mode="horizontal">
            <SubMenu title={<span><Icon type="user" />{user.user}</span>}>
              <Menu.Item key="setting:1">选项1</Menu.Item>
              <Menu.Item key="setting:2">选项2</Menu.Item>
              <Menu.Divider />
              <Menu.Item key="setting:3">注销</Menu.Item>
            </SubMenu>
            <Menu.Item key="mail">
              <Icon type="question" />帮助
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}
