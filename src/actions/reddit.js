/**
 * Created by chenyao0913 on 2016/3/28.
 */

import * as redditType from '../constant/reddit';

export function selectSubreddit(subreddit) {
  return {
    type: redditType.SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: redditType.INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestPosts(subreddit) {
  return {
    type: redditType.REQUEST_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, json) {
  return {
    type: redditType.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`http://rap.taobao.org/mockjsdata/2620/${subreddit}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState().redditReducer, subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    return false;
  };
}
