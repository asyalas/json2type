
import json2type from '../src/index'
import { Json2type } from '../src/types'
import * as fs from 'fs'

const testJSON: Json2type = {
  type: 'Object',
  description: '测试复杂类型',
  name: 'test',
  children: [
    {
      type: 'String',
      description: '测试test',
      name: 'a',
      required: true,
      children: []
    },
    {
      type: 'Number',
      description: '测试number',
      name: 'b',
      required: true,
      children: []
    },
    {
      type: 'Boolean',
      description: '测试boolean',
      name: 'c',
      required: true,
      children: []
    },
    {
      type: 'Any',
      description: '测试any',
      name: 'd',
      required: true,
      children: []
    },
    {
      type: 'Never',
      description: '测试 never',
      name: 'e',
      required: true,
      children: []
    },
    {
      type: 'Undefined',
      description: '测试 Uudefined',
      name: 'f',
      required: true,
      children: []
    },
    {
      type: 'Null',
      description: '测试 Null',
      name: 'g',
      required: true,
      children: []
    },
    {
      type: 'Void',
      description: '测试 Void',
      name: 'h',
      required: true,
      children: []
    },
    {
      type: 'Object',
      description: '测试object',
      name: 'i',
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
    },

    {
      type: 'Array',
      description: '测试 array',
      name: 'j',
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
    },
    {
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
    },

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
    },
    {
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
}
it('json2type should surport 14 types', () => {
  const ts = json2type(testJSON)
  const expectPath = './tests/expectTs1.ts'
  // fs.writeFileSync(expectPath, ts)
  const expectTs1 = fs.readFileSync(expectPath, 'utf-8')
  expect(ts).toEqual(expectTs1)
})
