import React, { PropTypes } from 'react';
import './Box.less';

/**
 * fieldset 实现，与原生 fieldset 类似样式，不被 ant 覆盖
 */
class Box extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]),
  };

  render() {
    return (
      <div className="code-box">
        <div className="code-box-meta markdown">
          <div className="code-box-title">{this.props.title}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Box;

