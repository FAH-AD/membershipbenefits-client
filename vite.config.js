import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {

    proxy: {
      '/api': {
        target: 'https://gowithflow-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/joinsecret-api': {
        target: 'https://www.joinsecret.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/joinsecret-api/, ''),
      },
    },
  },
})
