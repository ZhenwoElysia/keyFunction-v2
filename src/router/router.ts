import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 路由表
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'home',
    children: [
      {
        path: '',
        redirect: 'home' // 
      },
      {
        path:'home',
        name:"Home",
        component:()=>import('../layout/home/layoutHome.vue')
      },
      {
         path: 'setting',
         name:'Setting',
         component:()=>import('../layout/setting/layoutSetting.vue')
      }
    ]
  }
]

const router = createRouter({
  // Electron 必须使用 createWebHashHistory，createWebHistory 在electron会白屏
  history: createWebHashHistory(),
  routes
})

export default router