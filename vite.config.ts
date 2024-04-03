import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'AutoBase',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `autobase.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理 node 的 polyfill
      external: ['crypto', 'path', 'fs', 'os'],
      output: {
        // 为了 UMD 模式
        globals: {
          crypto: 'crypto',
          path: 'path',
          fs: 'fs',
          os: 'os',
        },
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.ts'],
  },
})
