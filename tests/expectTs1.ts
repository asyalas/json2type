// 测试枚举类型
export enum TestINEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试枚举类型
export enum TestJNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试枚举类型
export enum TestKNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试枚举类型
export enum TestLNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试枚举类型
export enum TestMNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试枚举类型
export enum TestNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
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
  i: {
    // 测试test
    test: string;
    // 测试枚举类型
    n: TestINEnum;
  };
  // 测试 array
  j: Array<{
    // 测试test
    test: string;
    // 测试枚举类型
    n: TestJNEnum;
  }>;
  // 测试联合类型
  k:
    | 'string value'
    | number
    | {
        // 测试test
        test: string;
      }
    | Array<{
        // 测试test
        test: string;
        // 测试test1
        test1: string;
      }>
    | TestKNEnum;
  // 测试交叉类型
  l: 'string value' &
    number & {
      // 测试test
      test: string;
    } & Array<{
      // 测试test
      test: string;
      // 测试test1
      test1: string;
    }> &
    TestLNEnum;
  // 测试元祖类型
  m: [
    'string value',
    number,
    {
      // 测试test
      test: string;
    },
    Array<{
      // 测试test
      test: string;
      // 测试test1
      test1: string;
    }>,
    TestMNEnum
  ];
  // 测试枚举类型
  n: TestNEnum;
}
