// https://vite.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  server: {
    proxy: {
      // 프록시할 경로
      "/api": {
        // 대상 서버
        target: "http://192.0.5.33:8080/",
        // 대상 서버의 호스트 헤더 변경 여부
        changeOrigin: true,
        // '/api' 부분 제거
        rewrite: (path) => path.replace(/^\/api/,""),
      },
    },
  },
})