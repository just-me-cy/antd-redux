import { PNO_NOTICE_ADD, PNO_NOTICE_DEL, PNO_NOTICE_CHANGE, CHANGE_VISIBLE, NOTICE_EDIT } from '../constant/notice';
import { combineReducers } from 'redux';

const initialNoitces = [];

const notices = (state = initialNoitces, action) => {
  switch (action.type) {
    case PNO_NOTICE_ADD:
      return [...state, action.payload];
    case PNO_NOTICE_DEL: {
      const index = action.payload.index;
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case PNO_NOTICE_CHANGE: {
      const index = action.payload.index;
      const stateRow = state[index];
      return [...state.slice(0, index),
        { ...stateRow, [action.payload.key]: action.payload.value },
        ...state.slice(index + 1)];
    }
    case NOTICE_EDIT: {
      return
    }
    default:
      return state;
  }
};

const isVisible = (state = false, action) => {
  switch (action.type) {
    case CHANGE_VISIBLE:
      return action.payload.isVisible;
    default:
      return state;
  }
};

const editItem = (state = { title: '', content: '', power: 1 }, action) => {
  switch (action.type) {
    case NOTICE_EDIT:
      return [...state.notices, ...action.payload];
    default:
      return state;
  }
};

const noticeReducer = combineReducers({
  notices,
  isVisible,
  editItem,
});

export default noticeReducer;
