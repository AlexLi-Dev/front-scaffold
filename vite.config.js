// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock', // mock 文件存放目录
      enable: true, // 是否启用
      logger: true, // 是否打印日志
    })
  ]
})