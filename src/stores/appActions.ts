/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-04-11 11:54:55
 * @description: store actions
 */
import { useAppStore } from './app'

export const useAppActions = defineStore('useAppActions', () => {
  const { token, loginStatus } = storeToRefs(useAppStore())

  /** 
   * 设置token
   * @param {string} tk token
   */
  const SET_TOKEN = (tk: string): void => {
    token.value = tk
  }

  /** 清除token */
  const REMOVE_TOKEN = (): void => {
    token.value = ''
  }

  /** 
   * 修改登录状态
   * @param {SetLoginStatus} target 要修改的登录状态数据
   */
  const SET_LOGIN_STATE = (target: App.SetLoginStatus): void => {
    loginStatus.value[target.key] = target.val
  }

  return { SET_TOKEN, REMOVE_TOKEN, SET_LOGIN_STATE }
})
