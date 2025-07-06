import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // Corrected from serverL to server
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Proxy to the backend server
        changeOrigin: true, // Change the origin of the host header to the target URL
      },
    }
  },
})