/*
 * action 创建函数--products
 */
import fetch from 'isomorphic-fetch';
import { createAction } from 'redux-actions';
import { REQUEST, RECEIVE, SEARCH, ERROR, GET_PRO_BY_ID, GET_PRO_BY_CATA, SET_PROD_FILTER } from '../constant/product';

export const request = createAction(REQUEST, (searchObj) => ({
  searchObj,
}));

export const receive = createAction(RECEIVE, (json) => {
  return {
    pros: json.products.map((child, index) => Object.assign({}, child, { key: index })),
  };
});

export const error = createAction(ERROR, ({
  errMsg,
}) => ({
  errMsg,
}));

export const search = createAction(SEARCH, (searchObj) => ({
  searchObj,
}));

export const setVisibilityFilter = createAction(SET_PROD_FILTER, (filter) => ({
  filter,
}));

function fetchPros(searchObj) {
  return dispatch => {
    dispatch(request(searchObj));

    let url = `${GET_PRO_BY_CATA}all`; // 初始显示所有产品
    if (searchObj.pid) {
      // 按id查询--只模拟了id=1
      url = `${GET_PRO_BY_ID}${searchObj.pid}`;
    } else if (searchObj.mainCata) {
      // 按类别查询
      url = `${GET_PRO_BY_CATA}${searchObj.mainCata}`;
    }

    return fetch(`${url}`)
      .then(response => response.json())
      .then(json => {
        if (json.hasOwnProperty('isOk')) {
          dispatch(error(json));
          return;
        }
        dispatch(receive(json));
      });
  };
}


export function getProduct(searchObj) {
  return (dispatch) => {
    return dispatch(fetchPros(searchObj));
  };
}
