/**
 * Created by chenyao0913 on 2016/3/30.
 */

import {
  combineReducers,
}
from 'redux';
import {
  REQUEST, RECEIVE, SEARCH, SET_FILTER, Filters,
}
from '../constant/product';

const {
  SHOW_ALL,
} = Filters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function search(state = '', action) {
  switch (action.type) {
    case SEARCH:
      return action.searchObj;
    default:
      return state;
  }
}

function products(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.pros,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function productsByQuery(state = {}, action) {
  switch (action.type) {
    case REQUEST:
    case RECEIVE:
      return Object.assign({}, state, {
        [action.searchObj]: products(state[action.searchObj], action),
      });
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
