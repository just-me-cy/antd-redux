import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { selectMenu } from '../../actions/menu';
import './SideBar.less';

const SubMenu = Menu.SubMenu;

class Sidebar extends React.Component {

  static propTypes = {
    currentKey: PropTypes.string.isRequired,
    currentSubMenu: PropTypes.string.isRequired,
    onMenuClicked: PropTypes.func.isRequired,
  };

  render() {
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo"></div>
        <Menu
          onClick={this.props.onMenuClicked}
          style={{ width: 240 }}
          defaultOpenKeys={[this.props.currentSubMenu]}
          selectedKeys={[this.props.currentKey]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="index">首页</Menu.Item>
          <SubMenu
            key="antd"
            title={<span><Icon type="setting" /><span>antd-demo</span></span>}
          >
            <Menu.Item key="showDatePicker">showDatePicker</Menu.Item>
            <Menu.Item key="myForm">myForm</Menu.Item>
            <Menu.Item key="showEditableTable">可编辑表格</Menu.Item>
          </SubMenu>
          <SubMenu
            key="redux"
            title={<span><Icon type="mail" /><span>redux-demo</span></span>}
          >
            <Menu.Item key="appTodo">appTodo</Menu.Item>
            <Menu.Item key="reddit">reddit</Menu.Item>
            <Menu.Item key="product">product</Menu.Item>
            <Menu.Item key="notice">notice</Menu.Item>
          </SubMenu>
        </Menu>
      </aside>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentKey: state.menu.currentKey,
    currentSubMenu: state.menu.currentSubMenu,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMenuClicked: item => dispatch(selectMenu({ item })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
