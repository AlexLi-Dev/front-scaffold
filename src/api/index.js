// src/utils/request.js
import axios from 'axios'

const request = (url = '', data = {}, method = 'get', timeout = 5000) => {
    console.log('使用封装函数去处理请求')

    return new Promise((resolve, reject) => {
        console.log('使用axios请求接口')

        const methodLower = method.toLowerCase()

        // GET 请求
        if (methodLower === 'get') {
            axios({
                method: methodLower,
                params: data,
                timeout: timeout,
                url: url
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        }

        // POST 请求
        if (methodLower === 'post') {
            axios({
                method: methodLower,
                data: data,
                timeout: timeout,
                url: url
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        }

        // PUT 请求
        if (methodLower === 'put') {
            axios({
                method: methodLower,
                data: data,
                timeout: timeout,
                url: url
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        }

        // DELETE 请求
        if (methodLower === 'delete') {
            axios({
                method: methodLower,
                params: data,
                timeout: timeout,
                url: url
            }).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error)
            })
        }
    })
}

export default request