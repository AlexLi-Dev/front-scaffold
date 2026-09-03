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