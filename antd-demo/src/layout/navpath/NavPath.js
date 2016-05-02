import React, { PropTypes } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import './NavPath.less';


class NavPath extends React.Component {

  static defaultProps = {
    navpath: [],
  };

  static propTypes = {
    navpath: PropTypes.array,
  };

  render() {
    const { navpath } = this.props;
    const bread = navpath.map(item => <Breadcrumb.Item key={`bc-${item.key}`}>{item.name}</Breadcrumb.Item>);
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item key="bc-0">navpath</Breadcrumb.Item>
          {bread}
        </Breadcrumb>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navpath: state.menu.navpath,
  };
}

export default connect(mapStateToProps)(NavPath);
