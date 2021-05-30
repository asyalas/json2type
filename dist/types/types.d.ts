export interface Json2type {
    type: 'String' | 'Number' | 'Boolean' | 'Any' | 'Never' | 'Undefined' | 'Null' | 'Void' | 'Object' | 'Array' | 'Intersection' | 'Union' | 'Tuple' | 'Enum';
    description?: string;
    name: string;
    required?: boolean;
    children: Json2type[];
    value?: string | number;
}
export interface Json2typeSubStackItem {
    modelName: string;
    data: Json2type;
}
export declare type ISpecialList = string[];
export declare type Json2typeSplitTypesList = string[];
export declare type Json2typeSubStack = Json2typeSubStackItem[];
