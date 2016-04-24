/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'antd';

export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }
  render() {
    return (
      <Row>
            {this.props.posts.map((post, i) =>
                <Col key = {i}>{i + 1}. <a href="#" key={i}>{post.title}</a> </Col>
            )}
      </Row>
    );
  }
}
