import { push } from 'react-router-redux';
import { createAction } from 'redux-actions';
import { MENU_SELECTED, INIT_CURRENT_MENU } from '../constant/menu';


const menuSelectedAction = createAction(MENU_SELECTED);
export const initCurrentMenu = createAction(INIT_CURRENT_MENU);

export function selectMenu(data) {
  return (dispatch) => {
    dispatch(menuSelectedAction(data));
    // 路由
    const keyPath = data.item.keyPath;
    const path = keyPath.reverse().reduce((parent, current) => `${parent}/${current}`, '');
    dispatch(push(path));
  };
}
