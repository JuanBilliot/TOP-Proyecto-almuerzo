import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const APPS_SCRIPT_PATH = '/macros/s/AKfycbxsxndS4fseU-GWw884BzJrZ9FIfTqTn95w3G0FQM9bcnt8RHxZK5KGBH4_GZ4snHFP/exec'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/selection': {
        target: 'https://script.google.com',
        changeOrigin: true,
        secure: true,
        rewrite: () => APPS_SCRIPT_PATH
      }
    }
  }
})
