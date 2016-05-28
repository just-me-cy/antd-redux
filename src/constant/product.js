/*
 * 常量
 */
// 发起请求
export const REQUEST = 'REQUEST';
// 收到请求
export const RECEIVE = 'RECEIVE';
// 查询
export const SEARCH = 'SEARCH';
// 查询失败
export const ERROR = 'ERROR';
// 结果过滤
export const SET_PROD_FILTER = 'SET_PROD_FILTER';
export const GET_PRODUCT = 'GET_PRODUCT';

export const Filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SHELVE: 'SHOW_SHELVE',
  SHOW_OFF_SHELVE: 'SHOW_OFF_SHELVE',
  SHOW_NEW: 'SHOW_NEW',
  SHOW_CONFIRM: 'SHOW_CONFIRM',
  SHOW_CHANGE: 'SHOW_CHANGE',
  SHOW_OUT_OF_SALE: 'SHOW_OUT_OF_SALE',
};
export const GET_PRO_BY_ID = 'http://rap.taobao.org/mockjsdata/2620/idEq/';
export const GET_PRO_BY_CATA = 'http://rap.taobao.org/mockjsdata/2620/byCata/';
