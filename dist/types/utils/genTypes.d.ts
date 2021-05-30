import { Json2type, ISpecialList } from '../types';
export declare const genObjectTypeContent: (data: Json2type[], modelName: string, specialList: ISpecialList) => string;
export declare const genArrayTypeContent: (data: Json2type[], modelName: string, specialList: ISpecialList) => string;
export declare const genUnionTypeContent: (data: Json2type[], modelName: string, specialList: ISpecialList) => string;
export declare const genIntersectionTypeContent: (data: Json2type[], modelName: string, specialList: ISpecialList) => string;
export declare const genTupleTypeContent: (data: Json2type[], modelName: string, specialList: ISpecialList) => string;
export declare const genEnumType: (name: string, data: Json2type) => string;
/**
 * 获取一个简单 TS 类型
 * @param {*} v
 * @returns
 */
export declare const genSimpleTSType: (v: Json2type) => string;
/**
 * 生成纯粹 ts 类型的内容
 * @param data
 * @returns
 */
export declare const genTypeContent: (data: Json2type[], modelName: string, specialList: ISpecialList) => (string | number)[];
/**
 * 获取所有的 TS 类型<平铺>
 * @param {*} data
 * @returns
 */
export declare const genTypes: (data: Json2type[], modelName?: string, specialList?: any[]) => string;
