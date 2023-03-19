/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-19 20:58:22
 * @description: store actions
 */
import type { SetLoginStatus } from '@/typings/app'
import { useAppStore } from './app'

export const useAppActions = defineStore('useAppActions', () => {
  const { token, loginStatus } = storeToRefs(useAppStore())

  // 设置token
  const SET_TOKEN = (tk: string) => {
    token.value = tk
  }
  const REMOVE_TOKEN = () => {
    token.value = ''
  }
  // 修改登录状态
  const SET_LOGIN_STATE = (target: SetLoginStatus) => {
    loginStatus.value[target.key] = target.val
  }

  return { SET_TOKEN, REMOVE_TOKEN, SET_LOGIN_STATE }
})
