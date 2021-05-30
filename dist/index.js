/*!
 * json2type.js v0.0.4
 * (c) 2018-2021 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var prettier = require('prettier');

var formatByPrettier = function (code) {
  try {
    return prettier.format(code, {
      singleQuote: true,
      trailingComma: 'none',
      parser: 'typescript'
    });
  } catch (error) {
    console.log('error', error);
    return code;
  }
};
/**
 * 首字母大写
 * @param name
 * @returns
 */

var toFirstCodeUpperCase = function (name) {
  return name.replace(/^\S/, function (s) {
    return s.toUpperCase();
  });
};
/**
 * 字母小写
 * @param name
 * @returns
 */

var toLowerCase = function (name) {
  return name.toLowerCase();
};

/**
 * 生成一个 type 的名称
 * @param prefix
 * @param name
 * @param type
 * @returns
 */

var genTypeName = function (prefix, name, suffix) {
  return "" + toFirstCodeUpperCase(prefix) + toFirstCodeUpperCase(name) + suffix;
};
/**
 * 获取描述
 * @param {} description
 * @returns
 */

var getDescription = function (description) {
  return description ? "// " + (typeof description === 'string' ? description.replace(/\n/g, '') : description) : '';
};
/**
 * 生成单个 ts 类型
 * @param data
 * @param content
 * @returns
 */

var getType = function (data, content) {
  return getDescription(data.description) + "\n" + data.name + " " + (data.required ? '' : '?') + ": " + content + ";\n";
};
/***
 * 获取一个导出类型的模版
 */

var getExportInterface = function (name, data, content) {
  return getDescription(data.description) + "\nexport interface " + toFirstCodeUpperCase(name) + " {\n   " + content + "\n}\n";
};
/***
 * 获取一个导出 enum 的模版
 */

var getExportEnum = function (name, data, content) {
  return getDescription(data.description) + "\nexport enum " + toFirstCodeUpperCase(name) + " {\n  " + content + "\n}\n";
};
/***
 * 获取一个导出 type 声明 的模版
 */

var getExportType = function (name, data, content) {
  return getDescription(data.description) + "\nexport type " + toFirstCodeUpperCase(name) + " = " + content + "\n";
};
/**
 * 基于类型，返回不同的 导出 模版
 * @param data
 * @param content
 * @returns
 */

var getExport = function (name, data, content) {
  switch (data.type) {
    case 'Enum':
      return getExportEnum(name, data, content);

    case 'Object':
      return getExportInterface(name, data, content);

    default:
      return getExportType(name, data, content);
  }
};

var genObjectTypeContent = function (data, modelName, specialList) {
  return "{" + genTypes(data, modelName, specialList) + "}";
}; // 生成一个数组类型

var genArrayTypeContent = function (data, modelName, specialList) {
  return "Array<{" + genTypes(data, modelName, specialList) + "}>";
}; // 生成一个联合类型

var genUnionTypeContent = function (data, modelName, specialList) {
  return genTypeContent(data, modelName, specialList).join('|');
}; // 生成一个交叉类型

var genIntersectionTypeContent = function (data, modelName, specialList) {
  return genTypeContent(data, modelName, specialList).join('&');
}; // 生成一个元祖类型

var genTupleTypeContent = function (data, modelName, specialList) {
  return "[" + genTypeContent(data, modelName, specialList).join(',') + "]";
}; // 生成一个枚举类型

var genEnumType = function (name, data) {
  return getExportEnum(name, data, data.children.map(function (v) {
    var value = v.value || v.name;
    return "\n" + getDescription(v.description) + "\n'" + v.name + "' = " + (v.type === 'String' ? "'" + value + "'" : value);
  }).join(','));
};
/**
 * 获取一个简单 TS 类型
 * @param {*} v
 * @returns
 */

var genSimpleTSType = function (v) {
  return getType(v, toLowerCase(v.type));
};
/**
 * 生成纯粹 ts 类型的内容
 * @param data
 * @returns
 */

var genTypeContent = function (data, modelName, specialList) {
  return data.map(function (item) {
    var type = item.type,
        _a = item.children,
        children = _a === void 0 ? [] : _a,
        value = item.value,
        name = item.name;
    var perfixName = genTypeName(modelName, name, '');

    switch (type) {
      case 'Object':
        return genObjectTypeContent(children, perfixName, specialList);

      case 'Array':
        return genArrayTypeContent(children, perfixName, specialList);

      case 'Union':
        return genUnionTypeContent(children, perfixName, specialList);

      case 'Intersection':
        return genIntersectionTypeContent(children, perfixName, specialList);

      case 'Tuple':
        return genTupleTypeContent(children, perfixName, specialList);

      case 'Enum':
        var enumName = genTypeName(modelName, name, 'Enum');
        specialList.push(genEnumType(enumName, item));
        return enumName;

      case 'String':
        return value ? "'" + value + "'" : toLowerCase(type);

      default:
        return value || toLowerCase(type);
    }
  });
};
/**
 * 获取所有的 TS 类型<平铺>
 * @param {*} data
 * @returns
 */

var genTypes = function (data, modelName, specialList) {
  if (modelName === void 0) {
    modelName = '';
  }

  if (specialList === void 0) {
    specialList = [];
  }

  return data.reduce(function (p, v) {
    var type = v.type,
        name = v.name,
        _a = v.children,
        children = _a === void 0 ? [] : _a;
    var perfixName = genTypeName(modelName, name, '');

    switch (type) {
      case 'Object':
        p += getType(v, genObjectTypeContent(children, perfixName, specialList));
        break;

      case 'Array':
        p += getType(v, genArrayTypeContent(children, perfixName, specialList));
        break;

      case 'Tuple':
        p += getType(v, genTupleTypeContent(children, perfixName, specialList));
        break;

      case 'Union':
        p += getType(v, genUnionTypeContent(children, perfixName, specialList));
        break;

      case 'Intersection':
        p += getType(v, genIntersectionTypeContent(children, perfixName, specialList));
        break;
      // 枚举比较特殊，必须分开定义

      case 'Enum':
        var enumName = genTypeName(modelName, name, 'Enum');
        specialList.push(genEnumType(enumName, v));
        p += getType(v, enumName);
        break;

      default:
        p += genSimpleTSType(v);
        break;
    }

    return p;
  }, '');
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var typesAlias = {
  Object: 'Map',
  Array: 'Item',
  Union: 'Union',
  Intersection: 'Intersection',
  Tuple: 'Tuple',
  Enum: 'Enum'
}; // 生成一个对象类型

var genSplitObjectTypeContent = function (data) {
  return data.join('');
}; // 生成一个联合类型

var genSplitUnionTypeContent = function (data) {
  return data.join('|');
}; // 生成一个交叉类型

var genSplitIntersectionTypeContent = function (data) {
  return data.join('&');
}; // 生成一个元祖类型

var genSplitTupleTypeContent = function (data) {
  return "[" + data.join(',') + "]";
}; // 生成一个渲染 数组 子项的对象

var getArrayItemSubStack = function (modelName, data) {
  return {
    modelName: modelName,
    data: __assign(__assign({}, data), {
      type: 'Object'
    })
  };
};

var getArrayType = function (name) {
  return "Array<" + name + ">";
};

var getSplitTypeContent = function (prefixName, data, totalSubStack) {
  return data.children.map(function (v) {
    var subName = genTypeName(prefixName, v.name, typesAlias[v.type]);

    switch (v.type) {
      case 'Array':
        totalSubStack.push(getArrayItemSubStack(subName, v));
        return getArrayType(subName);

      case 'Union':
      case 'Intersection':
      case 'Tuple':
        totalSubStack.push({
          modelName: subName,
          data: v
        });
        return subName;

      case 'Enum':
      case 'Object':
        totalSubStack.push({
          modelName: subName,
          data: v
        });
        return subName;

      case 'String':
        return v.value ? "'" + v.value + "'" : toLowerCase(v.type);

      default:
        return v.value || toLowerCase(v.type);
    }
  });
};
/**
 * 获取所有的 TS 类型<分散>
 * 这时候用 DFS 无法解决问题，采用 BFS 的算法来做
 * @param {*} data
 * @returns
 */


var genSplitTypes = function (data) {
  var res = [];

  var genSplitTS = function (data, modelName, isTop) {
    if (modelName === void 0) {
      modelName = '';
    }

    var totalSubStack = [];
    var type = data.type,
        name = data.name,
        value = data.value,
        children = data.children;
    var tsName = modelName || name;

    switch (type) {
      case 'Object':
        res.push(getExport(tsName, data, genSplitObjectTypeContent(children.map(function (v) {
          var subName = genTypeName(tsName, v.name, typesAlias[v.type]);

          switch (v.type) {
            case 'Object':
            case 'Union':
            case 'Intersection':
            case 'Tuple':
            case 'Enum':
              totalSubStack.push({
                modelName: subName,
                data: v
              });
              return getType(v, subName);

            case 'Array':
              totalSubStack.push(getArrayItemSubStack(subName, v));
              return getType(v, getArrayType(subName));

            default:
              return getType(v, toLowerCase(v.type));
          }
        }))));
        break;

      case 'Array':
        var arrayName = genTypeName('', tsName, typesAlias[type]);
        totalSubStack.push(getArrayItemSubStack(arrayName, data));
        res.push(getExport(data.name, data, getArrayType(arrayName)));
        break;

      case 'Tuple':
        var tupleName = genTypeName('', tsName, '');
        res.push(getExport(tupleName, data, genSplitTupleTypeContent(getSplitTypeContent(tsName, data, totalSubStack))));
        break;

      case 'Union':
        var unionName = genTypeName('', tsName, '');
        res.push(getExport(unionName, data, genSplitUnionTypeContent(getSplitTypeContent(tsName, data, totalSubStack))));
        break;

      case 'Intersection':
        var intersectionName = genTypeName('', tsName, '');
        res.push(getExport(intersectionName, data, genSplitIntersectionTypeContent(getSplitTypeContent(tsName, data, totalSubStack))));
        break;

      case 'Enum':
        res.push(genEnumType(tsName, data));
        break;

      case 'String':
        res.push(getExport(data.name, data, value ? "'" + value + "'" : type.toLowerCase()));
        break;

      default:
        res.push(getExport(data.name, data, "" + (value || type.toLowerCase())));
        break;
    } // })


    totalSubStack.forEach(function (v) {
      return genSplitTS(v.data, v.modelName);
    });
  };

  genSplitTS(data, '');
  return formatByPrettier(res.reverse().join(''));
};

var json2type = function (data) {
  var ts = '';
  var prefixContent = [];

  switch (data.type) {
    // 对象
    case 'Object':
      var objContent = genTypes(data.children, data.name, prefixContent);
      ts = prefixContent.join('') + "\n    " + getExport(data.name, data, objContent);
      break;
    // 数组

    case 'Array':
      var arrayContent = genArrayTypeContent(data.children, data.name, prefixContent);
      ts = prefixContent.join('') + "\n      " + getExport(data.name, data, arrayContent);
      break;
    // 交叉类型

    case 'Intersection':
      var intersectionTypeContent = genIntersectionTypeContent(data.children, data.name, prefixContent);
      ts = prefixContent.join('') + "\n      " + getExport(data.name, data, intersectionTypeContent);
      break;
    // 联合类型

    case 'Union':
      var unionTypeContent = genUnionTypeContent(data.children, data.name, prefixContent);
      ts = prefixContent.join('') + "\n      " + getExport(data.name, data, unionTypeContent);
      break;
    // 枚举

    case 'Enum':
      ts = genEnumType(data.name, data);
      break;
    // 元组

    case 'Tuple':
      var tupleTypeContent = genTupleTypeContent(data.children, data.name, prefixContent);
      ts = prefixContent.join('') + "\n      " + getExport(data.name, data, tupleTypeContent);
      break;

    default:
      ts = getExport(data.name, data, data.type.toLowerCase());
  }

  return formatByPrettier(ts);
};

exports.default = json2type;
exports.formatByPrettier = formatByPrettier;
exports.genArrayTypeContent = genArrayTypeContent;
exports.genEnumType = genEnumType;
exports.genIntersectionTypeContent = genIntersectionTypeContent;
exports.genObjectTypeContent = genObjectTypeContent;
exports.genSimpleTSType = genSimpleTSType;
exports.genSplitIntersectionTypeContent = genSplitIntersectionTypeContent;
exports.genSplitObjectTypeContent = genSplitObjectTypeContent;
exports.genSplitTupleTypeContent = genSplitTupleTypeContent;
exports.genSplitTypes = genSplitTypes;
exports.genSplitUnionTypeContent = genSplitUnionTypeContent;
exports.genTupleTypeContent = genTupleTypeContent;
exports.genTypeContent = genTypeContent;
exports.genTypeName = genTypeName;
exports.genTypes = genTypes;
exports.genUnionTypeContent = genUnionTypeContent;
exports.getArrayItemSubStack = getArrayItemSubStack;
exports.getDescription = getDescription;
exports.getExport = getExport;
exports.getExportEnum = getExportEnum;
exports.getExportInterface = getExportInterface;
exports.getExportType = getExportType;
exports.getType = getType;
exports.toFirstCodeUpperCase = toFirstCodeUpperCase;
exports.toLowerCase = toLowerCase;
