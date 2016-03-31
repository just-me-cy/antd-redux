/**
 * Created by chenyao on 16/3/27.
 */

import layout from './Layout';
import About from './About';
import inbox from './Inbox';
import Message from './Message';
import showDatePicker from './DatePicker';
import myForm from './Form';
import AppTodo from '../components/AppTodo';
import Reddit from '../containers/Root';
import Product from '../containers/ProRoot';

export const ROUTES = {
    path :'/',
    Component:layout,
    indexRoute:{component:layout},
    childRoutes:[
        {path:'showDatePicker',component:layout,indexRoute:{component:showDatePicker}},//时间控件
        {path:'myForm',component:layout,indexRoute:{component:myForm}},//表单控件
        {path:'appTodo',component:layout,indexRoute:{component:AppTodo}},
        {path:'reddit',component:layout,indexRoute:{component:Reddit}},
        {path:'product',component:layout,indexRoute:{component:Product}},
        {
          path:'inbox',
          indexRoute:{component:inbox},
          component:layout,
          childRoutes:[
            { path: '/messages/:id', component: Message },
            { path: 'messages/:id',
              onEnter: function (nextState, replaceState) {
                replaceState(null, '/messages/' + nextState.params.id)
              }
            }
          ]
        }
    ]
}
