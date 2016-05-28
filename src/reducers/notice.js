import { PNO_NOTICE_ADD, PNO_NOTICE_DEL, PNO_NOTICE_SAVE, PNO_NOTICE_EDIT } from '../constant/notice';
import { fromJS } from 'immutable';

const notices = (state = fromJS([]), action) => {
  switch (action.type) {
    case PNO_NOTICE_ADD: {
      // 新增加一行
      return state.push({ ...action.payload });
    }
    case PNO_NOTICE_DEL: {
      // 删除一行
      const index = state.findIndex((item) => (item.key === action.payload.key));
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

export default notices;
