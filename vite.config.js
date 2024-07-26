import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/anime':'https://aniwatch-api-woad-five.vercel.app',
      'ajax':'https://hianime.to',
      '/watch':'https://hianime.to'
    }
  },
  plugins: [react()],
})

