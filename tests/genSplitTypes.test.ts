
import { genSplitTypes } from '../src/index'

describe('rap2type', () => {
  it('should be defined', () => {
    expect(genSplitTypes).toBeDefined()
  })

  it('genSplitTypes should surport Number', () => {
    const ts = genSplitTypes({
      type: 'Number',
      description: '测试number',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试number
export type B = number;
`)
  })

  it('genSplitTypes should surport String', () => {
    const ts = genSplitTypes({
      type: 'String',
      description: '测试 String',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 String
export type B = string;
`)
  })

  it('genSplitTypes should surport Boolean', () => {
    const ts = genSplitTypes({
      type: 'Boolean',
      description: '测试 Boolean',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 Boolean
export type B = boolean;
`)
  })

  it('genSplitTypes should surport Any', () => {
    const ts = genSplitTypes({
      type: 'Any',
      description: '测试 Any',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 Any
export type B = any;
`)
  })

  it('genSplitTypes should surport Never', () => {
    const ts = genSplitTypes({
      type: 'Never',
      description: '测试 Never',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 Never
export type B = never;
`)
  })

  it('genSplitTypes should surport Undefined', () => {
    const ts = genSplitTypes({
      type: 'Undefined',
      description: '测试 Undefined',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 Undefined
export type B = undefined;
`)
  })

  it('genSplitTypes should surport Null', () => {
    const ts = genSplitTypes({
      type: 'Null',
      description: '测试 Null',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 Null
export type B = null;
`)
  })

  it('genSplitTypes should surport Void', () => {
    const ts = genSplitTypes({
      type: 'Void',
      description: '测试 Void',
      name: 'b',
      required: true,
      children: []
    })
    expect(ts).toEqual(
      `// 测试 Void
export type B = void;
`)
  })

  it('genSplitTypes should surport Object', () => {
    const ts = genSplitTypes({
      type: 'Object',
      description: '测试 Object',
      name: 'b',
      required: true,
      children: [{
        type: 'String',
        description: '测试test',
        name: 'test',
        required: true,
        children: []
      }]
    })
    expect(ts).toEqual(
      `// 测试 Object
export interface B {
  // 测试test
  test: string;
}
`)
  })

  it('genSplitTypes should surport Array', () => {
    const ts = genSplitTypes({
      type: 'Array',
      description: '测试 Array',
      name: 'b',
      required: true,
      children: [
        {
          type: 'String',
          description: '测试test',
          name: 'test',
          required: true,
          children: []
        },
        {
          type: 'String',
          description: '测试test1',
          name: 'test1',
          required: true,
          children: []
        }
      ]
    })
    expect(ts).toEqual(
      `// 测试 Array
export interface BItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 Array
export type B = Array<BItem>;
`)
  })

  it('genSplitTypes should surport Intersection', () => {
    const ts = genSplitTypes(
      {
        type: 'Intersection',
        description: '测试交叉类型',
        name: 'l',
        required: true,
        children: [
          {
            type: 'String',
            description: '测试 string',
            name: 'string',
            value: 'string value',
            required: true,
            children: []
          }, {
            type: 'Number',
            description: '测试 Number',
            name: 'number',
            required: true,
            children: []
          },
          {
            type: 'Object',
            description: '测试 intersection object',
            name: 'object',
            required: true,
            children: [
              {
                type: 'String',
                description: '测试test',
                name: 'test',
                required: true,
                children: []
              }
            ]
          },
          {
            type: 'Array',
            description: '测试 intersection array',
            name: 'array',
            required: true,
            children: [
              {
                type: 'String',
                description: '测试test',
                name: 'test',
                required: true,
                children: []
              },
              {
                type: 'String',
                description: '测试test1',
                name: 'test1',
                required: true,
                children: []
              }
            ]
          },
          {
            type: 'Enum',
            description: '测试枚举类型',
            name: 'n',
            required: true,
            children: [
              {
                type: 'String',
                description: '测试 string',
                name: 'red',
                value: '1',
                required: true,
                children: []
              }, {
                type: 'Number',
                description: '测试 Number',
                name: 'green',
                value: 2,
                required: true,
                children: []
              }
            ]
          }
        ]
      })
    expect(ts).toEqual(
      `// 测试枚举类型
export enum LNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 intersection array
export interface LArrayItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 intersection object
export interface LObjectMap {
  // 测试test
  test: string;
}
// 测试交叉类型
export type L = 'string value' &
  number &
  LObjectMap &
  Array<LArrayItem> &
  LNEnum;
`)
  })

  it('genSplitTypes should surport Union', () => {
    const ts = genSplitTypes({
      type: 'Union',
      description: '测试联合类型',
      name: 'k',
      required: true,
      children: [
        {
          type: 'String',
          description: '测试 string',
          name: 'string',
          value: 'string value',
          required: true,
          children: []
        }, {
          type: 'Number',
          description: '测试 Number',
          name: 'number',
          required: true,
          children: []
        },
        {
          type: 'Object',
          description: '测试 union object',
          name: 'object',
          required: true,
          children: [
            {
              type: 'String',
              description: '测试test',
              name: 'test',
              required: true,
              children: []
            }
          ]
        },
        {
          type: 'Array',
          description: '测试 union array',
          name: 'array',
          required: true,
          children: [
            {
              type: 'String',
              description: '测试test',
              name: 'test',
              required: true,
              children: []
            },
            {
              type: 'String',
              description: '测试test1',
              name: 'test1',
              required: true,
              children: []
            }
          ]
        },
        {
          type: 'Enum',
          description: '测试枚举类型',
          name: 'n',
          required: true,
          children: [
            {
              type: 'String',
              description: '测试 string',
              name: 'red',
              value: '1',
              required: true,
              children: []
            }, {
              type: 'Number',
              description: '测试 Number',
              name: 'green',
              value: 2,
              required: true,
              children: []
            }
          ]
        }
      ]
    })
    expect(ts).toEqual(
      `// 测试枚举类型
export enum KNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 union array
export interface KArrayItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 union object
export interface KObjectMap {
  // 测试test
  test: string;
}
// 测试联合类型
export type K =
  | 'string value'
  | number
  | KObjectMap
  | Array<KArrayItem>
  | KNEnum;
`)
  })

  it('genSplitTypes should surport Enum', () => {
    const ts = genSplitTypes({
      type: 'Enum',
      description: '测试枚举类型',
      name: 'n',
      required: true,
      children: [
        {
          type: 'String',
          description: '测试 string',
          name: 'red',
          value: '1',
          required: true,
          children: []
        }, {
          type: 'Number',
          description: '测试 Number',
          name: 'green',
          value: 2,
          required: true,
          children: []
        }
      ]
    })
    expect(ts).toEqual(
      `// 测试枚举类型
export enum N {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
`)
  })

  it('genSplitTypes should surport Tuple', () => {
    const ts = genSplitTypes({
      type: 'Tuple',
      description: '测试元祖类型',
      name: 'm',
      required: true,
      children: [
        {
          type: 'String',
          description: '测试 string',
          name: 'string',
          value: 'string value',
          required: true,
          children: []
        }, {
          type: 'Number',
          description: '测试 Number',
          name: 'number',
          required: true,
          children: []
        },
        {
          type: 'Object',
          description: '测试 Tuple object',
          name: 'a',
          required: true,
          children: [
            {
              type: 'String',
              description: '测试test',
              name: 'test',
              required: true,
              children: []
            }
          ]
        },
        {
          type: 'Array',
          description: '测试 Tuple array',
          name: 'b',
          required: true,
          children: [
            {
              type: 'String',
              description: '测试test',
              name: 'test',
              required: true,
              children: []
            },
            {
              type: 'String',
              description: '测试test1',
              name: 'test1',
              required: true,
              children: []
            }
          ]
        },
        {
          type: 'Enum',
          description: '测试枚举类型',
          name: 'n',
          required: true,
          children: [
            {
              type: 'String',
              description: '测试 string',
              name: 'red',
              value: '1',
              required: true,
              children: []
            }, {
              type: 'Number',
              description: '测试 Number',
              name: 'green',
              value: 2,
              required: true,
              children: []
            }
          ]
        }
      ]
    })
    expect(ts).toEqual(
      `// 测试枚举类型
export enum MNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}
// 测试 Tuple array
export interface MBItem {
  // 测试test
  test: string;
  // 测试test1
  test1: string;
}
// 测试 Tuple object
export interface MAMap {
  // 测试test
  test: string;
}
// 测试元祖类型
export type M = ['string value', number, MAMap, Array<MBItem>, MNEnum];
`)
  })
})
