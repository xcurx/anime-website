import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/anime':'http://localhost:4000',
      'ajax':'https://hianime.to',
      '/watch':'https://hianime.to'
    }
  },
  plugins: [react()],
})

