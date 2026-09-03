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

