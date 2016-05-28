import { MENU_SELECTED, INIT_CURRENT_MENU } from '../constant/menu';

const initialMenu = {
  currentKey: 'index',
  currentSubMenu: '',
  navpath: [],
};

export default function menu(menuState = initialMenu, action) {
  switch (action.type) {
    case MENU_SELECTED:
      const item = action.payload.item;
      return {
        currentKey: item.keyPath[0],
        currentSubMenu: '',
      };
    case INIT_CURRENT_MENU:
      return Object.assign({}, menuState, { currentKey: action.payload.currentKey, currentSubMenu: action.payload.currentSubMenu });
    default:
      return menuState;
  }
}
