/**
 * Created by chenyao on 2016/5/13.
 */

import validateRules from './validateRules';

/*
 * 绑定可编辑table单元格的验证规则
 *
 * @param id - String - 编辑单元格的id属性 (i.e. <Input id="myInputId" />)
 * @param initVal - String - 编辑单元格的defaultValue (i.e. <Input defaultValue="defaultValue" />)
 * @param rules - Object - {baseRules:[],funcs:[]}编辑单元格的验证规则，验证规则来源于validateRules.js,参数可选
 * @param callback - Function - getFieldProps 传入form的getFieldProps，对处理后的规则进行调用
 */
export const setValidation = (callback) => (id, initVal, rules = {}) => {
  const compositeRules = [];
  if (rules.baseRules) {
    rules.baseRules.map(item => compositeRules.push(validateRules.baseRules[item]));
  }
  if (rules.funcs) {
    rules.funcs.map(item => compositeRules.push({ validator: validateRules[item] }));
  }
  return callback && callback(id, { initialValue: initVal, rules: compositeRules });
};
