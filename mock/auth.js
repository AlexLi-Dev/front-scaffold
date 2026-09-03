// mock/auth.js
export default [
    {
        url: '/api/auth/login',
        method: 'post',
        rawResponse: async (req, res) => {
            // 解析请求体
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
            })

            req.on('end', () => {
                const { username, password } = JSON.parse(body)

                if (username === 'admin' && password === '123456') {
                    // 设置 cookie
                    const token = 'mock-token-' + Date.now()

                    // res.setHeader('Set-Cookie', [
                    //     `token=${token}; Path=/; Max-Age=1800; HttpOnly`,
                    //     `username=${username}; Path=/; Max-Age=1800`
                    // ])

                    res.statusCode = 200
                    res.end(JSON.stringify({
                        code: 0,
                        message: '登录成功',
                        data: {
                            token: token,
                            userInfo: {
                                id: 1,
                                username: 'admin',
                                name: '管理员',
                                role: 'admin'
                            }
                        }
                    }))
                } else {
                    res.statusCode = 401
                    res.end(JSON.stringify({
                        code: 401,
                        message: '用户名或密码错误',
                        data: null
                    }))
                }
            })
        }
    },

    {
        url: '/api/user/info',
        method: 'get',
        rawResponse: async (req, res) => {
            // 从 cookie 获取 token
            const cookie = req.headers.cookie || ''
            const tokenMatch = cookie.match(/token=([^;]+)/)
            const token = tokenMatch ? tokenMatch[1] : null

            if (!token) {
                res.statusCode = 401
                res.end(JSON.stringify({
                    code: 401,
                    message: '未登录'
                }))
                return
            }

            res.statusCode = 200
            res.end(JSON.stringify({
                code: 0,
                message: 'success',
                data: {
                    id: 1,
                    username: 'admin',
                    name: '管理员',
                    role: 'admin'
                }
            }))
        }
    },

    {
        url: '/api/auth/logout',
        method: 'post',
        rawResponse: async (req, res) => {
            // 清除 cookie
            res.setHeader('Set-Cookie', [
                'token=; Path=/; Max-Age=0',
                'username=; Path=/; Max-Age=0'
            ])

            res.statusCode = 200
            res.end(JSON.stringify({
                code: 0,
                message: '退出成功'
            }))
        }
    }
]