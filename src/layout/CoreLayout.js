import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavPath from './navpath/NavPath';
import Header from './header/Header';
import Sidebar from './sidebar/SideBar';
import Footer from './footer/Footer';
import './CoreLayout.less';

/**
 * 布局
 */
class CoreLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="ant-layout-aside">
        <Sidebar />
        <div className="ant-layout-main">
          <Header user={this.props.user} />
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(CoreLayout);
