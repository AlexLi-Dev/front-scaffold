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







Compute 与 watch 对比

## **computed 方式（推荐）**

javascript

```
const isFormValid = computed(() => {
  return userinfo.username.trim() && userinfo.password.trim()
})
```



**优点：**

- ✅ 代码简洁，语义清晰
- ✅ 自动缓存，依赖变化时才重新计算
- ✅ 纯函数，无副作用
- ✅ 性能更好（缓存机制）

**缺点：**

- ❌ 只能同步计算，不支持异步

------

## **watch 方式**

javascript

```
const isFormValid = ref(false)

watch(
  () => [userinfo.username, userinfo.password],
  ([username, password]) => {
    isFormValid.value = username.trim() && password.trim()
  },
  { immediate: true }
)
```



**优点：**

- ✅ 支持异步操作
- ✅ 可以执行副作用（如请求接口）
- ✅ 更灵活，可以做复杂逻辑

**缺点：**

- ❌ 代码冗余
- ❌ 需要额外定义 ref
- ❌ 没有缓存机制

------

## **对比总结**

| 特性       | computed | watch            |
| :--------- | :------- | :--------------- |
| 缓存       | ✅ 有     | ❌ 无             |
| 代码简洁度 | ✅ 简洁   | ❌ 繁琐           |
| 异步支持   | ❌ 不支持 | ✅ 支持           |
| 副作用     | ❌ 不建议 | ✅ 适合           |
| 性能       | ✅ 更好   | ⚠️ 一般           |
| 适用场景   | 派生数据 | 响应变化执行操作 |









# mock数据

有以下几种方式 mock 接口：

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



------

## 2. **使用 Mock.js 手动拦截（简单）**

javascript

```
// src/mock/index.js
import Mock from 'mockjs'

// 配置 mock
Mock.setup({
  timeout: '200-600' // 模拟延迟
})

// 登录接口
Mock.mock('/api/auth/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)
  
  if (username === 'admin' && password === '123456') {
    return {
      code: 0,
      message: '登录成功',
      data: {
        token: 'mock-token-' + Date.now(),
        userInfo: {
          id: 1,
          username: 'admin',
          name: '管理员'
        }
      }
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误'
    }
  }
})

// 获取用户信息
Mock.mock('/api/user/info', 'get', {
  code: 0,
  message: 'success',
  data: {
    id: 1,
    username: 'admin',
    name: '管理员',
    avatar: 'https://avatars.githubusercontent.com/u/1'
  }
})

// 使用 Mock.js 生成随机数据
Mock.mock('/api/user/list', 'get', {
  code: 0,
  message: 'success',
  'data|10-20': [{
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1,
    'email': '@email',
    'phone': /^1[3-9]\d{9}$/,
    'address': '@county(true)',
    'createTime': '@datetime'
  }]
})
```



### 在 main.js 中导入

javascript

```
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 开发环境启用 mock
if (import.meta.env.MODE === 'development') {
  import('./mock')
}

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
```









## 拦截器处理 token

![image-20260904010814844](/Users/mac/Library/Application Support/typora-user-images/image-20260904010814844.png)

------

代码如下：

```
// src/utils/request.js
import axios from 'axios'
import { CONFIG } from '../config/api.js'

// 创建 axios 实例
const instance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求拦截器
// instance.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             // 使用配置中的 token 名称
//             config.headers[CONFIG.TOKEN_NAME] = `${CONFIG.TOKEN_PREFIX}${token}`
//         }
//         return config
//     },
//     error => {
//         console.error('请求拦截器错误:', error)
//         return Promise.reject(error)
//     }
// )
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        console.log('🔵 拦截器执行')
        console.log('token:', token)

        if (token) {
            config.headers[CONFIG.TOKEN_NAME] = `${CONFIG.TOKEN_PREFIX}${token}`
            console.log('✅ 添加 Authorization 头:', config.headers[CONFIG.TOKEN_NAME])
        } else {
            console.warn('⚠️ 没有 token')
        }

        console.log('完整请求头:', config.headers)
        return config
    },
    error => {
        console.error('请求拦截器错误:', error)
        return Promise.reject(error)
    }
)




// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 直接返回数据
        return response.data
    },
    error => {
        // 统一错误处理
        if (error.response) {
            const { status, data } = error.response
            console.error(`请求失败 [${status}]:`, data?.message || error.message)

            // 401 未授权，跳转登录
            if (status === 401) {
                localStorage.removeItem('token')
                localStorage.removeItem('userInfo')
                window.location.href = '/#/login'
            }
        } else if (error.code === 'ECONNABORTED') {
            console.error('请求超时')
        } else {
            console.error('网络错误:', error.message)
        }

        return Promise.reject(error)
    }
)

// 封装请求函数
const request = (url = '', data = {}, method = 'get', timeout = 5000) => {
    console.log('使用封装函数去处理请求')

    return new Promise((resolve, reject) => {
        console.log('使用axios请求接口')

        const methodLower = method.toLowerCase()

        // GET 和 DELETE 用 params，其他用 data
        const isParamsMethod = methodLower === 'get' || methodLower === 'delete'

        instance({
            method: methodLower,
            url: url,
            timeout: timeout,
            [isParamsMethod ? 'params' : 'data']: data
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export default request
```

