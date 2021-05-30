
import { name, version, author } from './package.json'
import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
const path = require('path')

const banner = `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const isProd = process.env.NODE_ENV === 'production'

export default [
  {
    input: './src/index.ts',
    output: [{
      file: 'dist/index.js',
      format: 'cjs',
      banner
    }],
    external: [
      'prettier'
    ],
    plugins: [
      resolve({
        // 将自定义选项传递给解析插件
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        },
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      typescript({
        clean: true,
        rollupCommonJSResolveHack: true,
        exclude: ['*.d.ts', '**/*.d.ts'],
        useTsconfigDeclarationDir: true
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        runtimeHelpers: true
      }), ,
      isProd && terser()
    ]

  }
]
