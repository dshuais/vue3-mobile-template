/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-19 19:10:50
 * @description: store
 */
import type { LoginStatus } from "@/typings/app"

export const useAppStore = defineStore('app', () => {
  const token = ref<string>('')
  const loginStatus = reactive<LoginStatus>({ // 登录状态
    isLoading: false, //判断是否第一次进入
    isCancelLogin: false, //是否取消了登录
    isRealName: false, //是否实名
    isFreeNet: false, // 是否是非一网通用户
  })


  return { token, loginStatus }
}, {
  persist: { // persist:true 默认保存在local内
    key: 'app',
    storage: sessionStorage
  }
})
