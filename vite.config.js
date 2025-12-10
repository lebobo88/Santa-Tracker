import { defineConfig } from 'vite'

export default defineConfig({
  base: '/santa-tracker/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
})
