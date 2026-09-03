## 前端页面开发



## ui网站

- https://element-plus.org/en-US/component/overview



## vue github

- https://github.com/vuejs/create-vue

```
npm create vue@latest
```



## 初始化项目

![image-20260903204713281](/Users/mac/Library/Application Support/typora-user-images/image-20260903204713281.png)

![image-20260903204826503](/Users/mac/Library/Application Support/typora-user-images/image-20260903204826503.png)





安装router

```
npm install vue-router@4
```

在main.js中导入

```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 导入router

const app = createApp(App)
app.use(router)
app.mount('#app')

```

路由

```
// router.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [] // 空路由
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (token) {
    next() // 有token，放行
  } else {
    next('/login') // 无token，跳登录
  }
})

export default router
```



安装pinia

```
npm install pinia  
```

main.js

```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";


// 导入router
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)
app.mount('#app')
```



创建store/index.js

```vue
import {defineStore} from 'pinia'

export const useStoreDemo = defineStore('storeDemo',{
    state: ()=>{
        return {
            msg: "hello pinia"
        }
    },
    getters:{},
    // mutations:{},
    actions:{
        //接受参数
        changeStoreDemo(value){
            this.msg = value
        }
    }
})
```



安装axios

```
npm install axios
```

创建api/index.js

```
// request.js
import axios from 'axios'

// 创建实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    const msg = error.response?.data?.message || error.message || '请求失败'
    // 统一错误提示（可替换为你的UI组件）
    console.error(msg)
    return Promise.reject(error)
  }
)

export default request
```



安装element-plus

```
npm install element-plus --save
```

引入

```
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";
import ElementUI from './ElementUI.vue'

// 导入router
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).use(ElementUI)
app.mount('#app')

```


## mock数据
## 1. **使用 Vite 插件 vite-plugin-mock（推荐）**

### 安装

bash

```
npm install vite-plugin-mock mockjs -D
```



### 配置 vite.config.js

javascript

```
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
```



### 创建 mock 文件

javascript

```
// mock/auth.js
export default [
  // 登录接口
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      
      // 模拟登录验证
      if (username === 'admin' && password === '123456') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            token: 'mock-token-' + Date.now(),
            userInfo: {
              id: 1,
              username: 'admin',
              name: '管理员',
              role: 'admin'
            }
          }
        }
      } else {
        return {
          code: 401,
          message: '用户名或密码错误',
          data: null
        }
      }
    }
  },
  
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          id: 1,
          username: 'admin',
          name: '管理员',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/1'
        }
      }
    }
  }
]
```



javascript

```
// mock/user.js
export default [
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query
      
      // 使用 Mock.js 生成数据
      const list = Array.from({ length: pageSize }, (_, index) => ({
        id: (page - 1) * pageSize + index + 1,
        name: `用户${index + 1}`,
        age: Math.floor(Math.random() * 30) + 20,
        email: `user${index + 1}@example.com`,
        status: ['active', 'inactive'][Math.floor(Math.random() * 2)]
      }))
      
      return {
        code: 0,
        message: 'success',
        data: {
          list,
          total: 100,
          page,
          pageSize
        }
      }
    }
  }
]
```

