import { defineConfig, globalIgnores } from 'eslint/config'
import { configs } from '@eslint/js'
import tseslint from 'typescript-eslint'

export default defineConfig(
  configs.all,
  tseslint.configs.eslintRecommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  globalIgnores([
    '**/*.d.ts',
    '**/*.js',
    '**/*.js.map',
    '**/coverage/',
    '**/node_modules/'
  ]),
  {
    rules: {
      'array-bracket-spacing': [ 'error', 'always' ],
      'comma-dangle': [ 'error', 'never' ],
      'computed-property-spacing': [ 'error', 'never' ],
      // eslint-disable-next-line no-magic-numbers
      'indent': [ 'error', 2, { SwitchCase: 1 } ],
      'object-curly-spacing': [ 'error', 'always' ],
      'one-var': [ 'error', 'never' ],
      'quotes': [ 'error', 'single' ],
      'semi': [ 'error', 'never' ]
    }
  }
)
