import { PNO_NOTICE_ADD, PNO_NOTICE_DEL, PNO_NOTICE_SAVE, PNO_NOTICE_EDIT } from '../constant/notice';
import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

// const notices = (state = List(), action) => {
//   switch (action.type) {
//     // 新增加一行
//     case PNO_NOTICE_ADD: {
//       return state.push({ ...action.payload, index: state.size });
//     }
//     case PNO_NOTICE_DEL: {
//       const index = action.payload.index;
//       return state.delete(index);
//     }
//     case PNO_NOTICE_SAVE: {
//       // 保存数据
//       // debugger;
//       const index = state.findIndex((item) => (item.key === action.payload.key));
//       return state.setIn([index], { ...action.payload, editing: false });
//     }
//     case PNO_NOTICE_EDIT: {
//       // 启用编辑
//       // debugger;
//       const index = state.findIndex((item) => (item.key === action.payload.key));
//       return state.setIn([index], { ...action.payload, editing: true });
//     }
//     default:
//       return state;
//   }
// };

const notices = (state = fromJS([]), action) => {
  switch (action.type) {
    // 新增加一行
    case PNO_NOTICE_ADD: {
      return state.push({ ...action.payload, index: state.size });
    }
    case PNO_NOTICE_DEL: {
      const index = action.payload.index;
      return state.delete(index);
    }
    case PNO_NOTICE_SAVE: {
      // 保存数据
      // debugger;
      const index = state.findIndex((item) => (item.key === action.payload.key));
      return state.setIn([index], { ...action.payload, editing: false });
    }
    case PNO_NOTICE_EDIT: {
      // 启用编辑
      // debugger;
      const index = state.findIndex((item) => (item.key === action.payload.key));
      return state.setIn([index], { ...action.payload, editing: true });
    }
    default:
      return state;
  }
};

const noticeReducer = combineReducers({
  notices,
});

export default noticeReducer;
