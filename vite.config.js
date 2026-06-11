import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/Portfolio',
        changeOrigin: true,
      },
      '/assets/img/projects': {
        target: 'http://localhost/Portfolio',
        changeOrigin: true,
      }
    }
  }
})
