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