/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import { configs } from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  configs.all,
  tseslint.configs.all,
  {
    ignores: [
      './coverage/',
      './dist/',
      './node_modules/'
    ]
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },
  {
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'comma-dangle': [ 'error', 'never' ],
      'computed-property-spacing': [ 'error', 'never' ],
      'indent': [ 'error', 2, { SwitchCase: 1 } ],
      'object-curly-spacing': [ 'error', 'always' ],
      'one-var': [ 'error', 'never' ],
      'quotes': [ 'error', 'single' ],
      'semi': [ 'error', 'never' ]
    }
  }
)
