import { createAction } from 'redux-actions';
import { guid } from '../common/uuid';
import {
  PNO_NOTICE_ADD,
  PNO_NOTICE_DEL,
  PNO_NOTICE_EDIT,
  PNO_NOTICE_SAVE,
} from '../constant/notice';

// 新增加一行
export const onNoticeAdd = createAction(PNO_NOTICE_ADD, ({ title, content, power, editing }) => ({
  key: guid(),
  editing,
  title,
  content,
  power,
}));

// 删除一行
export const onNoticeDel = createAction(PNO_NOTICE_DEL, ({ key }) => ({ key }));

// 保存一行
export const onNoticeSave = createAction(PNO_NOTICE_SAVE, ({ title, content, power, key }) => (
{ title, content, power, key }));

// 启动编辑
export const onNoticeEdit = createAction(PNO_NOTICE_EDIT, ({ title, content, power, key }) => (
  { title, content, power, key }));
