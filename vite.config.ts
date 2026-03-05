import { compilerOptions } from './tsconfig.json'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'lib/index.ts',
      fileName: 'index',
      name: 'index'
    },
    minify: true,
    sourcemap: true,
    target: compilerOptions.target
  }
})
