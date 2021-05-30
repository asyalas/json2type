import { Json2type } from '../types';
/**
 * 生成一个 type 的名称
 * @param prefix
 * @param name
 * @param type
 * @returns
 */
export declare const genTypeName: (prefix: string, name: string, suffix: string) => string;
/**
 * 获取描述
 * @param {} description
 * @returns
 */
export declare const getDescription: (description?: string) => string;
/**
 * 生成单个 ts 类型
 * @param data
 * @param content
 * @returns
 */
export declare const getType: (data: Json2type, content: string) => string;
/***
 * 获取一个导出类型的模版
 */
export declare const getExportInterface: (name: string, data: Json2type, content: string) => string;
/***
 * 获取一个导出 enum 的模版
 */
export declare const getExportEnum: (name: string, data: Json2type, content: string) => string;
/***
 * 获取一个导出 type 声明 的模版
 */
export declare const getExportType: (name: string, data: Json2type, content: string) => string;
/**
 * 基于类型，返回不同的 导出 模版
 * @param data
 * @param content
 * @returns
 */
export declare const getExport: (name: string, data: Json2type, content: string) => string;
