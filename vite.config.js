import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 在生产中服务时的基本公共路径。
  plugins: [vue()],
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },
  server: {
    port: 3080,//启动端口
    // open: true,
    proxy: {
      // 选项写法
      // '/api': 'https://music.163.com'//代理网址
      '/api': {
        target: 'https://www.caikaiquan.xyz', // http://172.20.246.1:6060 // http://www.mybeta.ule.com:6060
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    cors: true
  },
  build: {
    // outDir: 'bundle', // 打包输出目录
  }
})
