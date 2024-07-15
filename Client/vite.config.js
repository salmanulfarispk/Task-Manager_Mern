import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{          //this supports development server configurations
    port: 3009,
    proxy: {                          //proxy for API requests during development.
      "/api": {
        target: 'http://localhost:8800',
        changeOrigin: true,
    }
  }
}
})
