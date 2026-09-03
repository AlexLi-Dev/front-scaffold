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