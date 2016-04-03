/*
 * action 创建函数--products
 */
import fetch from 'isomorphic-fetch';
import * as type from '../constant/product';

export function request(searchObj) {
  return {
    type: type.REQUEST,
    searchObj
  };
}

export function receive(searchObj, json) {
  console.log(3);
  console.log(json);
  return {
    type: type.RECEIVE,
    searchObj,
    pros: json.products.map(child => child),
    receivedAt: Date.now()
  };
}

export function search(searchObj) {
  return {
    type: type.SEARCH,
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
// function fetchPros(searchObj) {
//   return dispatch => {
//     dispatch(request(searchObj));
//     return fetch(`http://127.0.0.1:3000/datas/searchObj`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(searchObj)
//       })
//       .then(response => response.json())
//       .then(json => dispatch(receive(searchObj, json)))
//   }
// }

export function setVisibilityFilter(filter) {
  return {
    type: type.SET_FILTER,
    filter
  };
}

function shouldFetchPosts(state, searchObj) {
  const posts = state.productsByQuery[searchObj]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false;
  } else {
    return false;
  }
}

export function fetchProsIfNeeded(searchObj) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState().productReducer, searchObj)) {
      return dispatch(fetchPros(searchObj))
    }
  }
}