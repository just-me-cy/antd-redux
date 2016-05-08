import { createAction } from 'redux-actions';
import { guid } from '../common/uuid';
import {
  PNO_NOTICE_ADD,
  PNO_NOTICE_DEL,
  PNO_NOTICE_CHANGE,
  CHANGE_VISIBLE,
  NOTICE_EDIT,
} from '../constant/notice';

export const onNoticeAdd = createAction(PNO_NOTICE_ADD, ({ title, content, power }) => ({
  key: guid(),
  title,
  content,
  power,
}));

export const noticeEdit = createAction(NOTICE_EDIT, ({ title, content, power }) => ({ title, content, power }));

export const onNoticeDel = createAction(PNO_NOTICE_DEL, ({ index }) => ({ index }));

export const onNoticeChange = createAction(PNO_NOTICE_CHANGE, ({ key, value, index }) => ({ key, value, index }));

export const changeVisible = createAction(CHANGE_VISIBLE, ({ isVisible }) => ({ isVisible }));
