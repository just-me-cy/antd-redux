/**
 * action 类型
 * Created by chenyao0913 on 2016/3/30.
 * 产吕查询、结果（过滤）显示、翻页
 */
import fetch from 'isomorphic-fetch';

/*
 * 常量
 */
//发起请求
export const REQUEST = 'REQUEST';
//收到请求
export const RECEIVE = 'RECEIVE';
//查询
export const SEARCH = 'SEARCH';
//结果过滤
export const SET_FILTER = 'SET_FILTER';

export const Filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SHELVE: 'SHOW_SHELVE',
  SHOW_OFF_SHELVE: 'SHOW_OFF_SHELVE',
  SHOW_NEW:'SHOW_NEW',
  SHOW_CONFIRM:'SHOW_CONFIRM',
  SHOW_CHANGE:'SHOW_CHANGE',
  SHOW_OUT_OF_SALE:'SHOW_OUT_OF_SALE'
};


/*
 * action 创建函数
 */

export function request(searchObj) {
  return {
    type: REQUEST,
    searchObj
  };
}

export function receive(searchObj,json) {
  console.log(3);
  console.log(json);
  return {
    type: RECEIVE,
    searchObj,
    pros:json.products.map(child=>child),
    receivedAt: Date.now()
  };
}

export function search(searchObj){
  return {
    type: SEARCH,
    searchObj
  }
}

function fetchPros(searchObj) {
  return dispatch => {
    dispatch(request(searchObj));
    return fetch(`http://127.0.0.1:3000/datas/${searchObj}.json`)
      .then(response => response.json())
      .then(json => dispatch(receive(searchObj, json)))
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  };
}

function shouldFetchPosts(state, searchObj) {
  const posts = state.productsByQuery[searchObj]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false;
  }else{
    return false;
  }
}

export function fetchProsIfNeeded(searchObj) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), searchObj)) {
      return dispatch(fetchPros(searchObj))
    }
  }
}
