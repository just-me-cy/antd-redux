import React from 'react';
//import App from 'App';
import Sider from './Menu';
import FormDemo from './Form';
import {Row, Col, Menu,Icon} from 'antd';


const Layout = React.createClass({
  getInitialState() {
    return {
      test: ''
    };
  },
  render(){
    return <div style={{height:'100%'}}>
      <Row type="flex" justify="center" style={{height:'100%'}}>
        <Col span="3" style={{backgroundColor: '#fafafa',borderRight: '1px solid rgba(0,0,0,0.075)',boxShadow:' 0 0' +
         ' 5px rgba(0,0,0,0.1)'}}>
          <Sider />
        </Col>
        <Col span="21" style={{borderRight:'1px solid #fafafa'}}>
          {this.props.children || 'empty' }
        </Col>
      </Row>

    </div>
  }
});

export default Layout;
