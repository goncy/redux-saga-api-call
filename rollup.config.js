import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

let pkg = require('./package.json')

export default {
  entry: './src/index.js',
  plugins: [
    babel(babelrc())
  ],
  external: [
    'redux-saga/effects',
    'babel-runtime/regenerator',
    'babel-runtime/core-js/object/assign'
  ],
  globals: {
    'redux-saga/effects': 'reduxSaga_effects',
    'babel-runtime/regenerator': '_regeneratorRuntime',
    'babel-runtime/core-js/object/assign': '_Object$assign',
  },
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'reduxSagaApiCall',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true
    }
  ]
}
