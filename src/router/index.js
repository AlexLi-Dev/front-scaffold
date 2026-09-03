import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: HelloWorld
        }
    ]
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