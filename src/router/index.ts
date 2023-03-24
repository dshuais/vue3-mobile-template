/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-24 18:22:17
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

export default router
