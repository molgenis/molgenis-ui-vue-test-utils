'use strict'
import packageJson from './package.json'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/molgenis-vue-test-utils.js',
    external: ['chai'],
    output: [
      { file: packageJson.main, format: 'cjs' },
      { file: packageJson.module, format: 'es' }
    ],
    plugins: [
      babel({
        babelrc: false,
        presets: [['env', { modules: false }]],
        exclude: ['node_modules/**']
      })
    ]
  }
]
