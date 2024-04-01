// Composables
import { createRouter, createWebHistory } from 'vue-router'
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Pinia from 'pinia'

// Vue.use(VueRouter)
// Vue.use(Pinia)
// import { app } from './main.js' // main.js 是你的 Vue 实例所在的文件


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
        beforeEnter: (to, from, next) => {
          // 在跳转到登录页面之前执行某个函数
          console.log('Before entering login page');
          cancelAnimationFrame(stop); // 取消动画帧请求
          var canvas = document.getElementById('canvas_sakura');
          if (canvas) {
              canvas.parentNode.removeChild(canvas); // 移除 canvas 元素
          }
          next();
        }
      },
      {
        path: '/set-code',
        name: 'SetCode',
        component: () => import('@/views/SetCode.vue'),
        beforeEnter: (to, from, next) => {
          // 在跳转到登录页面之前执行某个函数
          console.log('Before entering login page');
          cancelAnimationFrame(stop); // 取消动画帧请求
          var canvas = document.getElementById('canvas_sakura');
          if (canvas) {
              canvas.parentNode.removeChild(canvas); // 移除 canvas 元素
          }
          next();
        }
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
        beforeEnter: (to, from, next) => {
          // 在跳转到登录页面之前执行某个函数
          console.log('Before entering login page');
          const script = document.createElement('script')
          script.src = './src/snow.js'
          // script.id = 'snow-script'; // 添加一个唯一的 id
          document.body.appendChild(script)
          next();
        }
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

// 导航守卫：在每次路由跳转之前移除之前加载的脚本
router.beforeEach((to, from, next) => {
  removeScript()
  next()
})



function removeScript() {
  // console.log(vueInstance.$root.snowScriptLoaded)
  const snowScript = document.getElementById('snow-script');
  console.log(snowScript)
  if (snowScript) {
      snowScript.remove();
      // vueInstance.$root.snowScriptLoaded = false;
  }
  console.log("removeScript")
  // console.log(vueInstance.$root.snowScriptLoaded)
}
export default router
