
import json2type from '../src/index'

describe('rap2type', () => {
  // it('should be defined', () => {
  //   expect(genSplitTypes).toBeDefined()
  // })
  it('should be defined', () => {
    expect(json2type).toBeDefined()
  })

  it('json2type should surport Number', () => {
    const ts = json2type({
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

  it('json2type should surport String', () => {
    const ts = json2type({
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

  it('json2type should surport Boolean', () => {
    const ts = json2type({
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

  it('json2type should surport Any', () => {
    const ts = json2type({
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

  it('json2type should surport Never', () => {
    const ts = json2type({
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

  it('json2type should surport Undefined', () => {
    const ts = json2type({
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

  it('json2type should surport Null', () => {
    const ts = json2type({
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

  it('json2type should surport Void', () => {
    const ts = json2type({
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

  it('json2type should surport Object', () => {
    const ts = json2type({
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

  it('json2type should surport Array', () => {
    const ts = json2type({
      type: 'Array',
      description: '测试 Array',
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
      `// 测试 Array
export type B = Array<{
  // 测试test
  test: string;
}>;
`)
  })

  it('json2type should surport Intersection', () => {
    const ts = json2type(
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

// 测试交叉类型
export type L = 'string value' &
  number & {
    // 测试test
    test: string;
  } & Array<{
    // 测试test
    test: string;
    // 测试test1
    test1: string;
  }> &
  LNEnum;
`)
  })

  it('json2type should surport Union', () => {
    const ts = json2type({
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

// 测试联合类型
export type K =
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
  | KNEnum;
`)
  })

  it('json2type should surport Enum', () => {
    const ts = json2type({
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

  it('json2type should surport Tuple', () => {
    const ts = json2type({
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
export enum MNEnum {
  // 测试 string
  'red' = '1',
  // 测试 Number
  'green' = 2
}

// 测试元祖类型
export type M = [
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
  MNEnum
];
`)
  })
})
