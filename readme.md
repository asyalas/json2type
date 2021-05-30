
# 介绍

json2type

通过一套 json 协议自动生成 ts 类型


## 功能
支持以下 ts 类型的转换

- String
- Number
- Boolean
- Any
- Never
- Undefined
- Null
- Void
- Object
- Array
- Intersection
- Union
- Tuple
- Enum 

## 快速开始

```bash
tnpm install json2type

```

```ts
// 简单的例子
const json2type= require('json2type')
json2type({
      type: 'Number',
      description: '测试number',
      name: 'b',
      required: true,
      children: []
})

// res ->

// 测试number
export type B = number;
```
[复杂的示例](https://github.com/asyalas/json2type/blob/master/tests/rap2type1.test.ts)

## API

- json2type

```ts
declare const json2type: (json: Json2type) => string;
```
- genSplitTypes

```ts
declare const genSplitTypes: (json: Json2type) => string;
```

## json 协议
```ts
export interface Json2type{
  // 类型
  type: 'String' | 'Number' | 'Boolean' | 'Any' | 'Never' | 'Undefined' | 'Null' | 'Void' | 'Object' | 'Array' | 'Intersection' | 'Union' | 'Tuple' | 'Enum';
  // 注释
  description?: string;
  // key
  name: string;
  // 是否一直存在
  required?: boolean;
  // 子节点
  children: Json2type[];
  // 值
  value?: string | number
}
```

