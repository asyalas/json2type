import { getDescription, genTypeName, getExportEnum, getType } from './templete'
import { Json2type, ISpecialList } from '../types'
import { toLowerCase } from './format'

// 生成一个对象类型
export const genObjectTypeContent = (data: Json2type[], modelName: string, specialList: ISpecialList): string => `{${genTypes(data, modelName, specialList)}}`

// 生成一个数组类型
export const genArrayTypeContent = (data: Json2type[], modelName: string, specialList: ISpecialList): string => `Array<{${genTypes(data, modelName, specialList)}}>`

// 生成一个联合类型
export const genUnionTypeContent = (data: Json2type[], modelName: string, specialList: ISpecialList): string => genTypeContent(data, modelName, specialList).join('|')

// 生成一个交叉类型
export const genIntersectionTypeContent = (data: Json2type[], modelName: string, specialList: ISpecialList): string => genTypeContent(data, modelName, specialList).join('&')

// 生成一个元祖类型
export const genTupleTypeContent = (data: Json2type[], modelName: string, specialList: ISpecialList): string => `[${genTypeContent(data, modelName, specialList).join(',')}]`

// 生成一个枚举类型
export const genEnumType = (name: string, data: Json2type) => {
  return getExportEnum(name, data, data.children.map(v => {
    const value = v.value || v.name
    return `
${getDescription(v.description)}
'${v.name}' = ${v.type === 'String' ? `'${value}'` : value}`
  }).join(','))
}

/**
 * 获取一个简单 TS 类型
 * @param {*} v
 * @returns
 */
export const genSimpleTSType = (v: Json2type) => getType(v, toLowerCase(v.type))

/**
 * 生成纯粹 ts 类型的内容
 * @param data
 * @returns
 */
export const genTypeContent = (data: Json2type[], modelName: string, specialList: ISpecialList) => {
  return data.map(item => {
    const { type, children = [], value, name } = item
    const perfixName = genTypeName(modelName, name, '')
    switch (type) {
      case 'Object':
        return genObjectTypeContent(children, perfixName, specialList)
      case 'Array':
        return genArrayTypeContent(children, perfixName, specialList)
      case 'Union':
        return genUnionTypeContent(children, perfixName, specialList)
      case 'Intersection':
        return genIntersectionTypeContent(children, perfixName, specialList)
      case 'Tuple':
        return genTupleTypeContent(children, perfixName, specialList)
      case 'Enum':
        const enumName = genTypeName(modelName, name, 'Enum')
        specialList.push(genEnumType(enumName, item))
        return enumName
      case 'String': return value ? `'${value}'` : toLowerCase(type)
      default: return value || toLowerCase(type)
    }
  })
}

/**
 * 获取所有的 TS 类型<平铺>
 * @param {*} data
 * @returns
 */
export const genTypes = (data: Json2type[], modelName = '', specialList = []) => data.reduce((p, v) => {
  const { type, name, children = [] } = v
  const perfixName = genTypeName(modelName, name, '')
  switch (type) {
    case 'Object':
      p += getType(v, genObjectTypeContent(children, perfixName, specialList)); break
    case 'Array':
      p += getType(v, genArrayTypeContent(children, perfixName, specialList)); break
    case 'Tuple':
      p += getType(v, genTupleTypeContent(children, perfixName, specialList)); break
    case 'Union':
      p += getType(v, genUnionTypeContent(children, perfixName, specialList)); break
    case 'Intersection':
      p += getType(v, genIntersectionTypeContent(children, perfixName, specialList)); break
      // 枚举比较特殊，必须分开定义
    case 'Enum':
      const enumName = genTypeName(modelName, name, 'Enum')
      specialList.push(genEnumType(enumName, v))
      p += getType(v, enumName); break
    default:
      p += genSimpleTSType(v)
      break
  }
  return p
}, '')
