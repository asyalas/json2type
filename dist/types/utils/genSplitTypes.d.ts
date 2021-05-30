import { Json2type, Json2typeSubStackItem } from '../types';
export declare const genSplitObjectTypeContent: (data: string[]) => string;
export declare const genSplitUnionTypeContent: (data: (string | number)[]) => string;
export declare const genSplitIntersectionTypeContent: (data: (string | number)[]) => string;
export declare const genSplitTupleTypeContent: (data: (string | number)[]) => string;
export declare const getArrayItemSubStack: (modelName: string, data: Json2type) => Json2typeSubStackItem;
/**
 * 获取所有的 TS 类型<分散>
 * 这时候用 DFS 无法解决问题，采用 BFS 的算法来做
 * @param {*} data
 * @returns
 */
export declare const genSplitTypes: (data: Json2type) => any;
