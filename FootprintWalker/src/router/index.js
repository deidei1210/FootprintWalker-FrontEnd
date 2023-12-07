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
      {
        path:'/home-page',
        name:'HomePage',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path:'/about-us',
        name:'AboutUs',
        component: () => import('@/views/AboutUs.vue'),
      },
      {
        path:'/assign-activity',
        name:'AssignActivity',
        component: () => import('@/views/AssignActivity.vue'),
      },
      {
        path:'/feedback',
        name:'Feedback',
        component: () => import('@/views/Feedback.vue'),
      },
      {
        path:'/personal-center',
        name:'PersonalCenter',
        component: () => import('@/views/PersonalCenter.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  removeScript() // 移除之前加载的脚本
  next()
})

function removeScript() {
  const scripts = document.querySelectorAll('script[src="./src/snow.js"]')
  scripts.forEach(script => {
    script.parentNode.removeChild(script)
  })
}
export default router
