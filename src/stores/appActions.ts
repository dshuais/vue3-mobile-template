/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-15 12:25:42
 * @description: store actions
 */
import { useAppStore } from './app'

export const useAppActions = defineStore('useAppActions', () => {
  const { token } = storeToRefs(useAppStore())

  // 设置token
  const SET_TOKEN = (tk: string) => {
    token.value = tk
  }
  const REMOVE_TOKEN = () => {
    token.value = ''
  }
  
  return { SET_TOKEN, REMOVE_TOKEN }
})
