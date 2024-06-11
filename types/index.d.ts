import { Plugin } from 'vite';
type AdditionalData = string | string[] | (() => string | string[]);
type Options = {
    [key: string]: AdditionalData;
};
/**
 * 创建一个自动添加额外数据的插件。
 *
 * 该函数生成一个Vite插件，该插件在代码转换阶段自动将指定的额外数据插入到匹配的文件中。
 * 这可以通过在选项中定义正则表达式来匹配文件路径，然后为匹配的文件提供要插入的代码字符串或生成代码的函数。
 *
 * @param options 一个包含键值对的对象，键是正则表达式字符串，值是要插入的代码或生成代码的函数。
 * @returns 返回一个Vite插件对象，该对象定义了插件的名称、应用时机和转换函数。
 */
export declare function additionalData(options: Options): Plugin<any>;
export {};
