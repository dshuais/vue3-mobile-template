/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-27 16:29:31
 * @description: vue-router
 */
// import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Home',
    component: Index
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/game.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(), // import.meta.env.BASE_URL
  routes
})

// 防止连续点击多次路由报错
const originalPush = router.push
router.push = function push(location) {
  return originalPush.call(this, location)
}

const originalReplace = router.replace
router.replace = function replace(location) {
  return originalReplace.call(this, location)
}

export default router
