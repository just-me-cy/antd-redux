/**
 * Created by chenyao on 16/3/27.
 */

import layout from '../components/Layout';
import showDatePicker from '../components/DatePicker';
import myForm from '../components/Form';
import AppTodo from '../containers/Todo';
import Reddit from '../containers/Reddit';
import Product from '../containers/Product';

export const ROUTES = {
  path: '/',
  Component: layout,
  indexRoute: {
    component: layout,
  },
  childRoutes: [{
    path: 'showDatePicker',
    component: layout,
    indexRoute: {
      component: showDatePicker,
    },
  }, // 时间控件
    {
      path: 'myForm',
      component: layout,
      indexRoute: {
        component: myForm,
      },
    }, // 表单控件
    {
      path: 'appTodo',
      component: layout,
      indexRoute: {
        component: AppTodo,
      },
    }, {
      path: 'reddit',
      component: layout,
      indexRoute: {
        component: Reddit,
      },
    }, {
      path: 'product',
      component: layout,
      indexRoute: {
        component: Product,
      },
    },
  ],
};
