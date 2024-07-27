import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/anime':{
        target:'https://cors-anywhere-d6p02hn89-sujals-projects-fcd11243.vercel.app//https://aniwatch-api-woad-five.vercel.app',
        changeOrigin:true,
        secure:false,
      },
      'ajax':'https://hianime.to',
      '/watch':'https://hianime.to'
    }
  },
  plugins: [react()],
})

