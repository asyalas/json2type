// 测试枚举类型
export enum TestNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试枚举类型
export enum TestMTupleNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 intersection array
export interface TestMTupleArrayItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 intersection object
export interface TestMTupleObjectMap {
  // 测试test
  test: string;
}
// 测试元祖类型
export type TestMTuple = [
  'string value',
  number,
  TestMTupleObjectMap,
  Array<TestMTupleArrayItem>,
  TestMTupleNEnum
];
// 测试枚举类型
export enum TestLIntersectionNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 intersection array
export interface TestLIntersectionArrayItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 intersection object
export interface TestLIntersectionObjectMap {
  // 测试test
  test: string;
}
// 测试交叉类型
export type TestLIntersection = 'string value' &
  number &
  TestLIntersectionObjectMap &
  Array<TestLIntersectionArrayItem> &
  TestLIntersectionNEnum;
// 测试枚举类型
export enum TestKUnionNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 union array
export interface TestKUnionArrayItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 union object
export interface TestKUnionObjectMap {
  // 测试test
  test: string;
}
// 测试联合类型
export type TestKUnion =
  | 'string value'
  | number
  | TestKUnionObjectMap
  | Array<TestKUnionArrayItem>
  | TestKUnionNEnum;
// 测试枚举类型
export enum TestJItemNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 array
export interface TestJItem {
  // 测试test
  test: string;
  // 测试枚举类型
  n: TestJItemNEnum;
}
// 测试枚举类型
export enum TestIMapNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试object
export interface TestIMap {
  // 测试test
  test: string;
  // 测试枚举类型
  n: TestIMapNEnum;
}
// 测试复杂类型
export interface Test {
  // 测试test
  a: string;
  // 测试number
  b: number;
  // 测试boolean
  c: boolean;
  // 测试any
  d: any;
  // 测试 never
  e: never;
  // 测试 Uudefined
  f: undefined;
  // 测试 Null
  g: null;
  // 测试 Void
  h: void;
  // 测试object
  i: TestIMap;
  // 测试 array
  j: Array<TestJItem>;
  // 测试联合类型
  k: TestKUnion;
  // 测试交叉类型
  l: TestLIntersection;
  // 测试元祖类型
  m: TestMTuple;
  // 测试枚举类型
  n: TestNEnum;
}
