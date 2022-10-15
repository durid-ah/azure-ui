import { defineConfig } from 'vite'

export default defineConfig({
   server: {
      proxy: {
         '/api': {
            target: 'http://localhost:6969',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
         },
         '/socket.io': {
            target: 'ws://localhost:6969',
            ws: true
         }
      }
 
   }
});
 