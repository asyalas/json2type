const prettier = require('prettier')

export const formatByPrettier = (code: string) => {
  try {
    return prettier.format(code, {
      singleQuote: true,
      trailingComma: 'none',
      parser: 'typescript'
    })
  } catch (error) {
    console.log('error', error)
    return code
  }
}

/**
 * 首字母大写
 * @param name
 * @returns
 */
export const toFirstCodeUpperCase = (name: string) => name.replace(/^\S/, s => s.toUpperCase())

/**
 * 字母小写
 * @param name
 * @returns
 */
export const toLowerCase = (name: string) => name.toLowerCase()
