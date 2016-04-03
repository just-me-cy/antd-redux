/**
 * action 类型
 * Created by chenyao0913 on 2016/3/30.
 * 产吕查询、结果（过滤）显示、翻页
 */

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
	SHOW_NEW: 'SHOW_NEW',
	SHOW_CONFIRM: 'SHOW_CONFIRM',
	SHOW_CHANGE: 'SHOW_CHANGE',
	SHOW_OUT_OF_SALE: 'SHOW_OUT_OF_SALE'
};