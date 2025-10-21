   import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import jsconfigPaths from 'vite-jsconfig-paths' // <-- 1. TAMBAHKAN BARIS INI

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        react(),
        jsconfigPaths() // <-- 2. TAMBAHKAN BARIS INI
      ],
    })