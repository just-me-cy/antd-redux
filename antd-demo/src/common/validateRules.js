/**
 * Created by chenyao on 2016/5/12.
 * 表单基本验证规则
 */

export default class validateRules {
  static baseRules = {
    required: { required: true, min: 1, message: '至少为 1 个字符' },
    email: { type: 'email', message: '请输入正确的邮箱地址' },
    url: { type: 'url', message: '请输入正确的url地址' },
  }
  // 示例：是否以A开头
  static beginWithA(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      if (value[0] !== 'A') {
        callback([new Error('抱歉，标题应该使用英文大写A开头')]);
      }
      callback();
    }
  }
  // 示例：用户名被占用
  static userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else if (value === 'aa') {
      callback([new Error('抱歉，该用户名已被占用。')]);
    }
    callback();
  }
   // 邮政编码
  static postcode(rule, value, callback) {
    if (!value) {
      callback();
    } else if (!(/\d{6}$/.test(value))) {
      callback([new Error('请输入正确的邮政编码')]);
    }
    callback();
  }
    // 电话号码,区号3位或4位，号码7位或8位，区号与电话号码之间用小括号或“-”隔开
  static tel(rule, value, callback) {
    if (!value) {
      callback();
    } else if (!(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value))) {
      callback([new Error('请输入正确电话号码')]);
    }
    callback();
  }
    // 移动电话
  static mobile(rule, value, callback) {
    if (!value) {
      callback();
    } else if (!(/^(1\d{10})?$/.test(value))) {
      callback([new Error('请输入正确手机号')]);
    }
    callback();
  }
}
