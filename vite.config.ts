import { compilerOptions } from './tsconfig.json'
import { defineConfig } from 'vite'
import dts from 'unplugin-dts/vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/index.ts',
      fileName: 'index',
      formats: [ 'umd', 'es' ],
      name: 'index'
    },
    sourcemap: true,
    target: compilerOptions.target
  },
  plugins: [
    dts({
      include: [
        'lib/*.ts'
      ]
    })
  ]
})
