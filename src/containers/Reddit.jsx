/**
 * Created by chenyao0913 on 2016/3/28.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/reddit';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import { Button, Row } from 'antd';

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <Row type="flex" justify="center" style={{ marginTop: 30 }}>
      <div>
        <Picker value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p style={{ marginTop: 10, marginBottom: 10 }}>
          {lastUpdated &&
          <span>
              更新于： {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
            </span>
          }
          {!isFetching &&
          <Button type="primary" onClick={this.handleRefreshClick} size="small" >
            刷新
          </Button>
          }
        </p>
        {isFetching && posts.length === 0 &&
        <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
        <h2>Empty.</h2>
        }
        {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
        }
      </div>
        </Row>
    );
  }
}

Reddit.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state.redditReducer;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[selectedSubreddit] || { isFetching: true, items: [] };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(Reddit);
