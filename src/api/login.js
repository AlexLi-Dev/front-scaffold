// src/api/login.js
import request from './index'
import { API_CONFIG, CONFIG } from '../config/api'

/**
 * 用户登录
 * @param {Object} data - 登录参数
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export const login = (data) => {
    return request(API_CONFIG.loginApi, data, 'post')
}

/**
 * 用户登出
 * @returns {Promise}
 */
export const logout = async () => {
    try {
        // 调用退出接口
        const res = await request(API_CONFIG.logoutApi, {}, 'post')

        // 清理本地存储
        localStorage.removeItem(CONFIG.TOKEN_NAME)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('username')

        return res
    } catch (error) {
        // 即使接口失败，也清理本地数据
        localStorage.removeItem(CONFIG.TOKEN_NAME)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('username')
        throw error
    }
}

/**
 * 获取用户信息
 * @returns {Promise}
 */
export const getUserInfo = () => {
    return request('/api/user/info', {}, 'get')
}
