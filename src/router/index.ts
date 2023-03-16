/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-16 15:12:35
 * @description: vue-router
 */
// import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
