import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/main.js'),
      name: 'ia-es-sdk',
      fileName: (format) => `ia-es-sdk.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
        globals: {},
      },
    },
    sourcemap: true,
    minify: true,
    target: 'esnext',
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'dist/**',
        'node_modules/**',
        './*.config.*',
        'src/dev.js',
        'src/__tests__/**'
      ]
    },
  }
})