/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // eslint-disable-next-line no-undef
    port: parseInt(process.env.PORT) || 5173,
    allowedHosts: [
      'frontend-hackaton-1.onrender.com',
      '.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  preview: {
    host: '0.0.0.0',
    // eslint-disable-next-line no-undef
    port: parseInt(process.env.PORT) || 4173,
    allowedHosts: true, // Allow all hosts in preview/production mode for Render deployment
  },
})
