import { genTypeName, getType, getExport } from './templete'
import { genEnumType } from './genTypes'
import { Json2type, Json2typeSubStack, Json2typeSubStackItem, Json2typeSplitTypesList } from '../types'
import { formatByPrettier, toLowerCase } from './format'

const typesAlias = {
  Object: 'Map',
  Array: 'Item',
  Union: 'Union',
  Intersection: 'Intersection',
  Tuple: 'Tuple',
  Enum: 'Enum'
}

// 生成一个对象类型
export const genSplitObjectTypeContent = (data: string[]): string => data.join('')

// 生成一个联合类型
export const genSplitUnionTypeContent = (data: (string | number)[]): string => data.join('|')

// 生成一个交叉类型
export const genSplitIntersectionTypeContent = (data: (string | number)[]): string => data.join('&')

// 生成一个元祖类型
export const genSplitTupleTypeContent = (data: (string | number)[]): string => `[${data.join(',')}]`

// 生成一个渲染 数组 子项的对象
export const getArrayItemSubStack = (modelName: string, data: Json2type): Json2typeSubStackItem => ({ modelName, data: { ...data, type: 'Object' } })

const getArrayType = (name: string) => `Array<${name}>`

const getSplitTypeContent = (prefixName: string, data: Json2type, totalSubStack: Json2typeSubStack) => {
  return data.children.map(v => {
    const subName = genTypeName(prefixName, v.name, typesAlias[v.type])
    switch (v.type) {
      case 'Array':
        totalSubStack.push(getArrayItemSubStack(subName, v))
        return getArrayType(subName)

      case 'Union':
      case 'Intersection':
      case 'Tuple':
        totalSubStack.push({ modelName: subName, data: v })
        return subName
      case 'Enum':
      case 'Object':
        totalSubStack.push({ modelName: subName, data: v })
        return subName
      case 'String': return v.value ? `'${v.value}'` : toLowerCase(v.type)
      default: return v.value || toLowerCase(v.type)
    }
  })
}

/**
 * 获取所有的 TS 类型<分散>
 * 这时候用 DFS 无法解决问题，采用 BFS 的算法来做
 * @param {*} data
 * @returns
 */

export const genSplitTypes = (data: Json2type) => {
  const res: Json2typeSplitTypesList = []
  const genSplitTS = (data: Json2type, modelName: string = '', isTop: boolean = false) => {
    const totalSubStack: Json2typeSubStack = []
    const { type, name, value, children } = data
    const tsName = modelName || name
    switch (type) {
      case 'Object':
        res.push(getExport(tsName, data, genSplitObjectTypeContent(children.map(v => {
          const subName = genTypeName(tsName, v.name, typesAlias[v.type])
          switch (v.type) {
            case 'Object':
            case 'Union':
            case 'Intersection':
            case 'Tuple':
            case 'Enum':
              totalSubStack.push({ modelName: subName, data: v })
              return getType(v, subName)
            case 'Array':

              totalSubStack.push(getArrayItemSubStack(subName, v))

              return getType(v, getArrayType(subName))
            default: return getType(v, toLowerCase(v.type))
          }
        }))))
        break
      case 'Array':
        const arrayName = genTypeName('', tsName, typesAlias[type])
        totalSubStack.push(getArrayItemSubStack(arrayName, data))
        res.push(getExport(data.name, data, getArrayType(arrayName)))
        break
      case 'Tuple':
        const tupleName = genTypeName('', tsName, '')
        res.push(getExport(tupleName, data, genSplitTupleTypeContent(getSplitTypeContent(tsName, data, totalSubStack))))
        break
      case 'Union':
        const unionName = genTypeName('', tsName, '')
        res.push(getExport(unionName, data, genSplitUnionTypeContent(getSplitTypeContent(tsName, data, totalSubStack))))

        break
      case 'Intersection':
        const intersectionName = genTypeName('', tsName, '')
        res.push(getExport(intersectionName, data, genSplitIntersectionTypeContent(getSplitTypeContent(tsName, data, totalSubStack))))
        break
      case 'Enum':
        res.push(genEnumType(tsName, data))
        break
      case 'String':
        res.push(getExport(data.name, data, value ? `'${value}'` : type.toLowerCase()))
        break
      default:
        res.push(getExport(data.name, data, `${value || type.toLowerCase()}`))
        break
    }
    // })
    totalSubStack.forEach(v => genSplitTS(v.data, v.modelName))
  }

  genSplitTS(data, '', true)
  return formatByPrettier(res.reverse().join(''))
}
