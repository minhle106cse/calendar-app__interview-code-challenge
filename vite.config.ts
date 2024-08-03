import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oauth/token': {
        target: 'https://www.eventbrite.com',
        changeOrigin: true
      },
      '/v3': {
        target: 'https://www.eventbriteapi.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
