//用来放置项目的配置信息

import api from "../api/index.js";

export const API_CONFIG = {
    loginApi: '/api/auth/login',
    logoutApi: '/api/auth/logout'
}


export const CONFIG = {
    TOKEN_NAME: 'Authorization',
    TOKEN_PREFIX: 'Bearer '  // 推荐加上前缀
}

