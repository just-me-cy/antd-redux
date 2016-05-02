import React, { PropTypes } from 'react';
import './PanelBox.less';

export default class PanelBox extends React.Component {

  static propTypes = {
    title: PropTypes.object,
    children: PropTypes.element,
  };

  render() {
    return (
      <div className="panel-box ant-collapse">
        <div className="ant-collapse-item">
          <div className="ant-collapse-header">
            <span>{this.props.title}</span>
          </div>
          <div className="ant-collapse-content ant-collapse-content-active">
            <div className="ant-collapse-content-box">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
