// Composables
import { createRouter, createWebHistory } from 'vue-router'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Pinia from 'pinia'

// Vue.use(VueRouter)
// Vue.use(Pinia)

//定义路由规则
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
      },
      {
        path: '/set-code',
        name: 'SetCode',
        component: () => import('@/views/SetCode.vue'),
      },
      {
        path: '/reset-code',
        name: 'ResetCodeFinal',
        component: () => import('@/views/ResetCodeFinal.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
