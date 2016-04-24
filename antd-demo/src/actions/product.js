/*
 * action 创建函数--products
 */
import fetch from 'isomorphic-fetch';
import * as type from '../constant/product';

export function request(searchObj) {
  return {
    type: type.REQUEST,
    searchObj,
  };
}

export function receive(searchObj, json) {
  return {
    type: type.RECEIVE,
    searchObj,
    pros: json.products.map(child => child),
    receivedAt: Date.now(),
  };
}

export function search(searchObj) {
  return {
    type: type.SEARCH,
    searchObj,
  };
}

function fetchPros(searchObj) {
  return dispatch => {
    dispatch(request(searchObj));
    return fetch('http://rap.taobao.org/mockjsdata/2620/byCata/all')
      .then(response => response.json())
      .then(json => dispatch(receive(searchObj, json)));
  };
}

export function setVisibilityFilter(filter) {
  return {
    type: type.SET_FILTER,
    filter,
  };
}

function shouldFetchPosts(state, searchObj) {
  const posts = state.productsByQuery[searchObj];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return false;
}

export function fetchProsIfNeeded(searchObj) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState().productReducer, searchObj)) {
      return dispatch(fetchPros(searchObj));
    }
  };
}
