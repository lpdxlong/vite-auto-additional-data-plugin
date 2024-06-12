"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.additionalData = additionalData;
var _pluginutils = require("@rollup/pluginutils");
/**
 * 创建一个自动添加额外数据的插件。
 *
 * 该函数生成一个Vite插件，该插件在代码转换阶段自动将指定的额外数据插入到匹配的文件中。
 * 这可以通过在选项中定义正则表达式来匹配文件路径，然后为匹配的文件提供要插入的代码字符串或生成代码的函数。
 *
 * @param options 一个包含键值对的对象，键是正则表达式字符串，值是要插入的代码或生成代码的函数。
 * @returns 返回一个Vite插件对象，该对象定义了插件的名称、应用时机和转换函数。
 */
function additionalData(options) {
  // 将选项中的键转换为正则表达式对象，并存储匹配信息。
  var matches = Object.keys(options).map(function (key) {
    return {
      regExp: new RegExp(key),
      key: key
    };
  });
  var filter = (0, _pluginutils.createFilter)(['**/*.ts', '**/*.js'], ['node_modules/**']);
  // 返回定义好的Vite插件对象。
  return {
    name: 'vite:auto-additional-data-plugin',
    enforce: 'post',
    // 定义代码转换函数，用于在匹配的文件中插入额外数据。
    transform: function transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      // 查找与当前文件路径匹配的额外数据插入规则。
      var match = matches.find(function (match) {
        return match.regExp.test(id);
      });
      // 如果没有匹配的规则，则不进行处理。
      if (!match) {
        return;
      }
      // 获取匹配规则对应的插入数据。
      var insertCodes = options[match.key];
      // 如果插入数据是一个函数，调用它以获取实际的代码字符串。
      if (insertCodes instanceof Function) {
        insertCodes = insertCodes();
      }
      // 如果插入数据是一个数组，将数组中的所有元素合并为一个字符串。
      if (Array.isArray(insertCodes)) {
        insertCodes = insertCodes.join('\n');
      }
      if (!insertCodes) {
        return;
      }
      // 将插入代码与原始代码拼接，形成新的代码。
      var newCode = "".concat(insertCodes, "\n").concat(code);
      // 返回新的代码和源映射信息。
      return {
        code: newCode
      };
    }
  };
}