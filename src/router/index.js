import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
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
// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('token')
//
//     if (token) {
//         next()
//     } else {
//         next('/login')
//     }
// })

export default router