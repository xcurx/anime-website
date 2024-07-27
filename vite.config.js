import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/anime':{
        target:'https://aniwatch-api-woad-five.vercel.app',
        changeOrigin:true,
        secure:false,
        // rewrite: path => path.replace(/^\/anime/, '')
      },
      'ajax':'https://hianime.to',
      '/watch':'https://hianime.to'
    }
  },
  plugins: [react()],
})

