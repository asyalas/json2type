
export interface Json2type {
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
  // 枚举的值
  value?: string | number
}

export interface Json2typeSubStackItem {
  modelName: string;
  data: Json2type
}

export type ISpecialList = string[]

export type Json2typeSplitTypesList = string[]

export type Json2typeSubStack = Json2typeSubStackItem[]
