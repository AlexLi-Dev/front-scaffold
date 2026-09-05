import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import { CONFIG } from '../config/api.js'
// import Login from '../views/Login.vue'
const Login = ()=>import('../views/Login.vue')

const listRoutes={}

const routes = [
    {
        path: '/',
        name: 'Hello',
        component: HelloWorld
    },

    //登陆页面
    {
        path: '/login',
        // name: 'Login',
        component: Login
    }
]




const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

// 路由守卫
// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem(CONFIG.TOKEN_NAME)

    // 需要登录的页面
    if (to.meta.requiresAuth) {
        if (token) {
            next() // 有token，放行
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 记录目标路径，登录后跳转
            })
        }
    } else {
        // 不需要登录的页面
        if (to.path === '/login' && token) {
            next('/') // 已登录，跳转首页
        } else {
            next() // 放行
        }
    }
})
export default router
