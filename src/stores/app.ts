/*
 * @Author: dushuai
 * @Date: 2023-03-13 15:45:54
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-15 11:51:46
 * @description: store
 */
export const useAppStore = defineStore('app', () => {
  const token = ref<string>('')

  return { token }
}, {
  persist: { // persist:true 默认保存在local内
    key: 'app',
    storage: sessionStorage
  }
})
