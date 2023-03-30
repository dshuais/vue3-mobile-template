/*
 * @Author: dushuai
 * @Date: 2023-03-29 18:26:28
 * @LastEditors: dushuai
 * @LastEditTime: 2023-03-29 18:40:44
 * @description: 弹窗store
 */

import type { Popups } from "@/enum/popups"
import type { Ref } from 'vue'

type PopupList = {
  [key in Popups]?: {  }
}
interface Obj {
  show: Ref<boolean>
}

/** popups列表 不存回话 */
export const usePopupsStore = defineStore('popups', () => {
  
  const popups = ref<PopupList>({})

  return { popups }
})
