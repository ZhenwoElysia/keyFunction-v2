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
  history: createWebHashHistory(),
  routes
})

export default router