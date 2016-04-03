/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, { PropTypes, Component } from 'react'
import {Row,Col} from 'antd';

export default class Posts extends Component {
  render() {
    return (
      <Row>
            {this.props.posts.map((post, i) =>
                <Col>{i+1}. <a href="#" key={i}>{post.title}</a> </Col>
            )}
      </Row>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
}
