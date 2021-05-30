import { formatByPrettier, genTypes, getExport, genArrayTypeContent, genIntersectionTypeContent, genUnionTypeContent, genEnumType, genTupleTypeContent } from './utils'
import { Json2type, ISpecialList } from './types'

const json2type = (data: Json2type) => {
  let ts = ''
  const prefixContent: ISpecialList = []
  switch (data.type) {
    // 对象
    case 'Object':
      const objContent = genTypes(data.children, data.name, prefixContent)
      ts = `${prefixContent.join('')}
    ${getExport(data.name, data, objContent)}`; break
    // 数组
    case 'Array':
      const arrayContent = genArrayTypeContent(data.children, data.name, prefixContent)
      ts = `${prefixContent.join('')}
      ${getExport(data.name, data, arrayContent)}`; break
    // 交叉类型
    case 'Intersection':
      const intersectionTypeContent = genIntersectionTypeContent(data.children, data.name, prefixContent)
      ts = `${prefixContent.join('')}
      ${getExport(data.name, data, intersectionTypeContent)}`; break
    // 联合类型
    case 'Union':
      const unionTypeContent = genUnionTypeContent(data.children, data.name, prefixContent)
      ts = `${prefixContent.join('')}
      ${getExport(data.name, data, unionTypeContent)}`; break
    // 枚举
    case 'Enum':
      ts = genEnumType(data.name, data)
      break
    // 元组
    case 'Tuple':
      const tupleTypeContent = genTupleTypeContent(data.children, data.name, prefixContent)
      ts = `${prefixContent.join('')}
      ${getExport(data.name, data, tupleTypeContent)}`; break
    default:
      ts = getExport(data.name, data, data.type.toLowerCase())
  }

  return formatByPrettier(ts)
}

export default json2type

export * from './types'
export * from './utils'
