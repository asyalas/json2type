
import { Json2type } from '../types'
import { toFirstCodeUpperCase } from './format'

/**
 * 生成一个 type 的名称
 * @param prefix
 * @param name
 * @param type
 * @returns
 */
export const genTypeName = (prefix: string, name: string, suffix: string) => `${toFirstCodeUpperCase(prefix)}${toFirstCodeUpperCase(name)}${suffix}`

/**
 * 获取描述
 * @param {} description
 * @returns
 */
export const getDescription = (description?: string) => description ? `// ${typeof description === 'string' ? description.replace(/\n/g, '') : description}` : ''

/**
 * 生成单个 ts 类型
 * @param data
 * @param content
 * @returns
 */
export const getType = (data: Json2type, content: string) => `${getDescription(data.description)}
${data.name} ${data.required ? '' : '?'}: ${content};
`

/***
 * 获取一个导出类型的模版
 */
export const getExportInterface = (name: string, data: Json2type, content: string) => `${getDescription(data.description)}
export interface ${toFirstCodeUpperCase(name)} {
   ${content}
}
`

/***
 * 获取一个导出 enum 的模版
 */
export const getExportEnum = (name: string, data: Json2type, content: string) => `${getDescription(data.description)}
export enum ${toFirstCodeUpperCase(name)} {
  ${content}
}
`

/***
 * 获取一个导出 type 声明 的模版
 */
export const getExportType = (name: string, data: Json2type, content: string) => `${getDescription(data.description)}
export type ${toFirstCodeUpperCase(name)} = ${content}
`

/**
 * 基于类型，返回不同的 导出 模版
 * @param data
 * @param content
 * @returns
 */
export const getExport = (name: string, data: Json2type, content: string) => {
  switch (data.type) {
    case 'Enum': return getExportEnum(name, data, content)
    case 'Object': return getExportInterface(name, data, content)
    default: return getExportType(name, data, content)
  }
}
