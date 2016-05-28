/**
 * Created by chenyao0913 on 2016/3/30.
 */
import { Map, fromJS } from 'immutable';
import { combineReducers } from 'redux';
import {
  REQUEST, RECEIVE, ERROR, SEARCH, SET_PROD_FILTER, Filters,
}
from '../constant/product';

/* eslint no-console:"off"*/
/* eslint new-cap: [2, { "capIsNew": false }] */
const {
  SHOW_ALL,
} = Filters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_PROD_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
}

function search(state = Map({ cata: '健康保险', pid: void 0 }), action) {
  switch (action.type) {
    case SEARCH:
      return fromJS(action.payload.searchObj);
    default:
      return state;
  }
}

function products(state = fromJS({
  isFetching: false,
  items: [],
  errMsg: '',
}), action) {
  switch (action.type) {
    case REQUEST:
      return state.merge(Map({ isFetching: true, errMsg: '' }));
    case RECEIVE:
      console.log('拿到数据receive-----');
      return state.merge(fromJS({
        isFetching: false,
        items: action.payload.pros,
        errMsg: '',
      }));
    case ERROR:
      return state.merge(fromJS({
        isFetching: false,
        errMsg: action.payload.errMsg,
        items: [],
      }));
    default:
      return state;
  }
}

function productsByQuery(state = fromJS({
  isFetching: true,
  items: [],
  errMsg: '',
}), action) {
  switch (action.type) {
    case ERROR:
    case REQUEST:
    case RECEIVE:
      return state.merge(products(state, action));
    default:
      return state;
  }
}

const productReducer = combineReducers({
  visibilityFilter,
  productsByQuery,
  search,
});

export default productReducer;
