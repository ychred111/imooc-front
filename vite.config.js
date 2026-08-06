import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path, { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolID格式
      symbolID: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 代理
  server: {
    proxy: {
      '/api': {
        // 代理所有 /api 的请求，改请求将被代理到 target 中
        target: 'https://api.imooc-front.lgdsunday.club/',
        // 跨域
        changeOrigin: true
      }
    }
  }
})
